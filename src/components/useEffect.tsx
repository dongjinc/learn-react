// https://juejin.cn/post/6844903985338400782#heading-31
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import axios from 'axios'
// useEffect Hook看作 componentDidMount、componentDidUpdate、componentWillUnmount 一般用来数据获取、设置订阅以及手动更改React组件中的DOM都属于副作用
// useEffect 会在每次渲染后都执行(提前没有第二个参数)、react hook采用了闭包机制
//   useEffect 依赖数组为[]，意味着该hook旨在组件挂载时运行一次，并非重新渲染。

/**
 * 1.与class组件相对应的生命周期有哪几个？与class组件中产生的弊端与函数组件相比
 * 2.第二参数deps数组
 * 3.场景
 */


/**
 * 1.概念
 * effect 属于副作用范畴，其中数据获取、设置订阅以及手动更改React组件中的DOM都属于副作用
 * 2.机制
 * 告诉React组件需要在渲染后执行某些操作
 * React Hook采用了闭包机制，可以在effect内部访问state、props、useRef变量
 * (提前没有第二个参数)每次渲染后都执行，默认情况在第一次渲染之后和每次更新之后都会执行。
 * 3.对应class组件哪几个声明周期
 * 4.性能优化，跳过effect
 * 在class组件中，通过componentDidUpdate中添加prevProps或prevState比较逻辑解决
 * 在函数组件中，如果某些特定值在两次重渲染没有发生变化，可通知React跳过对effect的调用，只要传递数组作为useEffect的第二个可选参数即可
 * 如果传递一个空数组作为第二个参数，仅在组件挂载和卸载时执行，effect内部的props和state就会一直拥有其初始值
 * 在依赖列表中不建议省略函数
 */

export function Demo1 (){
    const [count, setCount] = useState(0)
    const isRule = useRef(null)
    useEffect(() => {
    console.log(isRule, 456)
   
    document.title = `you clicked ${count} times`
    }, [])
    console.log('init')
    return (
      <div ref={isRule}>
        <p>you clicked {count} times</p>
        <button onClick={() => {
            setCount(count + 1)
        }}>
          Click me
        </button>
      </div>
    )
}
// 使用ref保存一个可变的变量，然后可以对它进行读写。此时，第二个 useEffect 内可以读取到最新的props值
export function EffectDemo2(props){
    // 把最新的props保存在一个ref中
    const lastestProps = useRef(props)
    useEffect(() => {
        lastestProps.current = props
    })
    useEffect(() => {
        function tick(){
            console.log(lastestProps.current)
        }
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])
    return (
        <div>children</div>
    )
}

// 在依赖列表中省略函数是否安全
function Example({someProp}){
  const doSomething = () => {
    console.log(someProp)
  }
  useEffect(() => {
    doSomething()
  }, []) // 这样不安全，它调用了doSomething函数使用了someProp
}
// 通常会想要在effect内部声明它所需要的函数，这样就能容易看出哪个effect依赖了组件作用域中的哪些值
function Exapmle1({someProp}){
  useEffect(() => {
    function doSomething(){
      console.log(someProp)
    }
    doSomething()
  }, [someProp])
}

// 通过useEffect获取数据
export function SearchResults(){
  const [data, setData] = useState({hits: []})
  const [query, setQuery] = useState('react')

  useEffect(() => {
    let ignore = false
    async function fetchData(){
      const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query)
      // 频繁操作时，setData会受限制，从而减少render次数
      if(!ignore) {
        setData(result.data)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [query])
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
//https://jancat.github.io/post/2019/translation-usememo-and-usecallback/
// 依赖列表，引用相等
export function EffectDemo3({bar, baz}){
  console.log(bar)
  const options = {bar,baz}
  useEffect(() => {
    console.log(options, 'options')
  }, [options]) // 这里有问题，因为effect将对每次渲染中对options引用相等性检查，由于js的工作方式，每次渲染options都是新的
  return <div>foobar{baz}</div>
}
// 上面问题可通过两件事来解决
export function EffectDemo4({bar, baz}){
  useEffect(() => {
    const options = {bar, baz}
    console.log(options, 'options')
  }, [bar, baz])
  return <div>foobar</div>
}
const MemoEffectDemo4 = memo(EffectDemo4)

// 但如果bar或者baz是对象/数组/函数等,这也不是一个实际的解决方案,这正是useCallback和useMemo存在的原因
// 同样的事情也适用于传递给useEffect/useLayoutEffect/useCallback/useMemo

export function Blub(){
  // const bar = () => {}
  // const baz = [1,2,3]
  const bar = useCallback(() => {}, [])
  const baz = useMemo(() => [1,2,3], [])
  const [count, setCount] = useState(0)
  const timeRef = useRef(null)
  clearTimeout(timeRef.current)
  timeRef.current = setTimeout(() => {
    setCount(count + 1)
  }, 1000)
  return (
    <div>
      count: {count}
      <MemoEffectDemo4 bar={bar} baz={baz}/>
    </div>
  )
}
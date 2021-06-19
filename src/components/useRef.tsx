// useRef 可以在其.current属性中保存一个可变值的盒子

import { useEffect, useRef, useState } from "react";

/**
 * useRef 可操作dom，current属性设置为响应的DOM节点
 * useRef 比ref属性更有用，这是因为ref创建的是一个普通js对象，而useRef()和自建的一个{current:...}对象唯一区别，useRef会在每次渲染时返回同一个ref对象
 * useRef 当ref对象内容发生变化时，useRef并不会通知你。变更.current属性不会引发组件重新渲染
 */
export function RefDemo1(){
    const kRef = useRef(null)
    kRef.current.id = '20px'
    setTimeout(() => {
        kRef.current.style.color = 'red'
    }, 2000)
    return (
        <div ref={kRef}>
            love
        </div>
    )
}

export function RefDemo2(){
    const [count, setCount] = useState(0)
    const btnRef = useRef(null)
    useEffect(() => {
        console.log('use effect ...')
        const btnCurrent = btnRef.current
        const onClick = () => {
            setCount(count + 1)
        }
        btnCurrent.addEventListener('click', onClick, false)
        return () => btnCurrent.removeEventListener('click', onClick, false)
    })
    return (
        <div>
            <p>{count}</p>
            <button ref={btnRef}>click me</button>
        </div>
    )
}

/**
 * 通过useRef 获取上一轮的Props或State
 * 利用useEffect特性，第一次渲染之后和每次渲染之后都会执行。保证了每次运行effect的同时，DOM都已经更新完毕
 */
function usePrevious(value: number){
    console.log(value, 'value')
    const ref= useRef(0)
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export function RefDemo3(){
    const [count, setCount] = useState(0)
    const onCountChange = () => {
        setCount(count + 1)
    }
    const prevCalculation = usePrevious(count)
    return (
        <h1 onClick={onCountChange}>now: {count}, before: {prevCalculation}</h1>
    )
}
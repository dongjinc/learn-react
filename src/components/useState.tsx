import { memo, useCallback, useMemo, useState } from "react";

// hooks 解决的问题
// 1.类组件的不足
//  1).状态逻辑难复用
//  2).趋向复杂难以维护


/**
 * 
 useState
 1.hook内部使用Object.is来比较新/旧state是否相等
 2.与class组件中的setState方法不同,如果修改状态的时候,传的状态值没有变化,则不重新渲染
 3.与class组件中的setState方法不同,useState不会自动合并更新对象.可用函数式的setState结合展开运算符来达到合并更新对象的效果
 */
// 如果修改状态,传入的状态值没有变化,则不重新渲染

export function StateDemo1(){
    const [counter, setCount] = useState({name: '计数器', number: 0})
    console.log('render Counter')
    return (
        <>
            <button onClick={() => setCount(counter)}>++</button>
        </>
    )
}

/**
 * 减少渲染次数
 * 默认情况,只要父组件状态变了(不管组件依不依赖该状态),子组件也会重新渲染
 * 一般优化
 * 1.类组件:可以使用pureComponent
 * 2.函数组件:使用React.memo,会返回一个新的组件,如果接受的属性不变,则不重新渲染函数
 * 深入优化
 * 1.useCallback: 接收一个内联回调函数参数和一个依赖项数组(子组件依赖父组件的状态,即子组件会用到父组件的值),useCallback会返回该回调函数memoized版本,该回调函数仅在某个依赖项改变时才会更新
 * 2.useMemo: 把创建函数和依赖项数组作为参数传入useMemo,它仅会在某个依赖项改变时才重新激素按memoized值,有助于避免在每次渲染时进行高开销的计算
 */
function SubCounter({onClick, data}){
    console.log('Subcounter render')
    return (
        <button onClick={onClick}>{data.number}</button>
    )
}
const SubCounters = memo(SubCounter)
// 开销大
export function StateDemo2(){
    console.log('init')
    const [name, setName] = useState('计算器')
    const [number, setNumber] = useState(0)
    // 使用useState,每次更新都是独立的,因此对象 {} === {} -> false,以及addClick同理,会导致子组件刷新,即使number没有变化
    const data = {number}
    const addClick = () => {
        setNumber(number + 1)
    }
    return (
        <>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <SubCounters data={data} onClick={addClick} />
        </>
    )
}
let oldData, oldAddClick
// 优化后
export function GoodsStateDemo2(){
    console.log('init')
    const [name, setName] = useState('计算器')
    const [number, setNumber] = useState(0)
    // 父组件更新时,这里的变量和函数每次都会重新创建,那么子组件接收到的属性每次都会认为是最新的
    // 所以子组件也会随之更新,这时候可用到useMemo
    // 有没有后面的依赖项数组很重要,否则还是会重新渲染
    // 如果后面的依赖项数组没有值,即使父组件的number值改变了,子组件也不会去更新
    // const data = useMemo(() => ({number}), [])
    const data = useMemo(() => ({number}), [number])
    console.log(oldData === data, '1')
    oldData = data
    const addClick = useCallback(() => {
        setNumber(number => number + 1)
    }, [])
    console.log(oldAddClick === addClick, '2')
    oldAddClick = addClick
    return (
        <>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <SubCounters data={data} onClick={addClick} />
        </>
    )
}


// useState 源码

// let firstWorkInProgressHook = {memoizedState: null, next: null};
// let workInProgressHook;

// function useState(initState) {
//     let currentHook = workInProgressHook.next ? workInProgressHook.next : {memoizedState: initState, next: null};

//     function setState(newState) {
//         currentHook.memoizedState = newState;
//         render();
//     }
//   	// 这就是为什么 useState 书写顺序很重要的原因
// 		// 假如某个 useState 没有执行，会导致指针移动出错，数据存取出错
//     if (workInProgressHook.next) {
//         // 这里只有组件刷新的时候，才会进入
//         // 根据书写顺序来取对应的值
//         // console.log(workInProgressHook);
//         workInProgressHook = workInProgressHook.next;
//     } else {
//         // 只有在组件初始化加载时，才会进入
//         // 根据书写顺序，存储对应的数据
//         // 将 firstWorkInProgressHook 变成一个链表结构
//         workInProgressHook.next = currentHook;
//         // 将 workInProgressHook 指向 {memoizedState: initState, next: null}
//         workInProgressHook = currentHook;
//         // console.log(firstWorkInProgressHook);
//     }
//     return [currentHook.memoizedState, setState];
// }

// function Counter() {
//     // 每次组件重新渲染的时候，这里的 useState 都会重新执行
//     const [name, setName] = useState('计数器');
//     const [number, setNumber] = useState(0);
//     return (
//         <>
//             <p>{name}:{number}</p>
//             <button onClick={() => setName('新计数器' + Date.now())}>新计数器</button>
//             <button onClick={() => setNumber(number + 1)}>+</button>
//         </>
//     )
// }

// function render() {
//     // 每次重新渲染的时候，都将 workInProgressHook 指向 firstWorkInProgressHook
//     workInProgressHook = firstWorkInProgressHook;
//     ReactDOM.render(<Counter/>, document.getElementById('root'));
// }

// render();

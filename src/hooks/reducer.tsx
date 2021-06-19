import React, { memo, ProviderProps, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

/**
 * useState的替代方案，接收一个形如(state, action) => newState的reducer
 * state逻辑较复杂且包含多个子值
 */

/**
 * 特性
 * 1.React会确保dispatch函数标识是稳定的，并且不会再组件重新渲染时改变。这就是为什么可以安全地从useEffect或useCallback的依赖列表中省略dispatch
 * 2.跳过dispatch 如果Reducer hook的返回值与当前state相同，React将跳过子组件的渲染及副作用的执行。(不理解)
 */

const initalState = {
    count: 0
}
function init(initalCount){
    return {count: initalCount}
}

function reducer(state, action){
    switch(action.type){
        case 'increment':
            return {count: state.count}
        case 'decrement':
            return {count: state.count - 1}
        case 'reset':
            return init(action.payload)
        default:
            throw new Error();
    }
}



const TodoDispatch = React.createContext(null)
const CounterDemo1ChildrenMemo = memo(CounterDemo1Children)

// 特性2
export function CounterDemo1(){
    const [todos, dispatch] = useReducer(reducer, initalState)
    const [count, setCount] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setCount(count => count + 1)
        }, 3000)
    }, [])
    console.log(123)
    return (
        <TodoDispatch.Provider value={dispatch}>
            <CounterDemo1Children todos={todos} />
        </TodoDispatch.Provider>
    )
}
function CounterDemo1Children({todos}){
    const dispatch = useContext(TodoDispatch)
    console.log(dispatch, 'dispatch')
    const handleClick = () => {
        dispatch({
            type: 'increment'
        })
    }
    return (
        <button onClick={handleClick}>{todos.count}</button>
    )
}

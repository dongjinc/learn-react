import React, { useContext, useReducer } from "react"

const reducer = (state = 0, {type}) => {
    switch(type){
        case 'add': 
            return state + 1
        case 'delete':
            return state - 1
        default:
            return state
    }
}
const ContextDemo1Child = () =>{
    const [count, dispath] = useContext(ContextDemoOne)
    console.log('child')
    return (
        <div>
            <p>child...{count}</p>
            <button onClick={() => dispath({type: 'add'})}>child add</button>
            <button onClick={() => dispath({type: 'delete'})}>child delete</button>
        </div>
    )
}

const ContextDemoOne = React.createContext(null)
export function ContextDemo1(){
    const [count, dispath] = useReducer(reducer, 10)
    return (
        <ContextDemoOne.Provider value={[count, dispath]}>
            <div>
                <p>mom...</p>
                <ContextDemo1Child />
                <button onClick={() => dispath({type: 'add'})}>mom add</button>
                <button onClick={() => dispath({type: 'delete'})}>mom delete</button>
            </div>
        </ContextDemoOne.Provider>
    )

}

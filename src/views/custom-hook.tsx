import { useState } from "react";

function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState)
    function dispatch(action) {
        const nextState = reducer(state, action)
        setState(nextState)
    }
    return [state, dispatch]
}

const initialState = { count: 0 }
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispath] = useReducer(reducer, initialState)
    return (
        <>
            Count: {state.count}
        </>
    )
}


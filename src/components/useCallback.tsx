import { useCallback, useEffect, useState } from "react";

export function CallbackDemo1(){
    const [count, setCount] = useState(0)
    const [data, setData] = useState([1,2,3,4])
    
    useEffect(() => {
        setTimeout(() => {
            setData([1,2,3])
        }, 3000)
    }, [])
    console.log(data, 'data')
    const memoizedCallback = useCallback((count) => {
        console.log(count, data)
        setCount(count + 1)
    }, [data]) // 如果数组
    return (
        <div>
            count: {count}
            <button onClick={() => memoizedCallback(count)}>click</button>
        </div>
    )
}

// useRef 可以在其.current属性中保存一个可变值的盒子

import { useRef } from "react";

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

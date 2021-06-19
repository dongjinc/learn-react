import { useEffect, useRef } from "react";

/**
 * 非受控组件
 * 受控组件，表单数据由React组件来管理
 * 非受控组件，表单数据将由DOM节点来处理
 */

/**
 * 1.非受控组件将真实数据存储在DOM节点中，所以在使用非受控组件时，有时候反而更容易同时集成React和非React代码。使用非受控组件往往可以减少代码量
 * 2.React赋予组件一个初始值，defaultValue属性
 */
export function UncontrolledDemo1() {
  const inputRef = useRef<HTMLInputElement>();
 
  const handleSubmit = (event) => {
    console.log(inputRef.current.value, 123)
    event.preventDefault()
  }

  useEffect(() => {
    inputRef.current.defaultValue = "kl"
  })

  return (
      <form onSubmit={handleSubmit}>
          <label>Name: <input type="text" ref={inputRef} /></label>
          <input type="submit" value="Submit" />
      </form>
  )
}

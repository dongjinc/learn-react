/**
 * 通过中间元素传递props
 */

import React, { createContext, memo, useState } from 'react'

// function Toolbar(props: {theme: string}){
//     return <ThemeButton theme={props.theme} />
// }

// class ThemeButton extends React.Component<{theme: string}>{
//     render(){
//         return <div>{this.props.theme}</div>
//     }
// }
// class ContextComponents extends React.Component {
//     render(){
//         return (
//             <div>
//                 <Toolbar theme="dark"></Toolbar>
//             </div>
//         )
//     }
// }

/**
 * Context可以让我们无须明确地传遍每一个组件，将值深入传递组件树
 * 为当前的theme创建一个context('light'为默认值)
 */
 const ThemeContext = React.createContext({name: 1})

function Toolbar(){
    return (
        <div>
            <ThemeButton />
        </div>
    )
}




class ThemeButton extends React.Component{
    // 指定contextType 读取当前的theme context
    // React会往上找到最近的theme Provider，然后使用它的值
    static contextType = ThemeContext
    // 声明context
    declare context: React.ContextType<typeof ThemeContext>
    

    render(){
        console.log(this, ThemeContext)
        return (
            <div>{this.context.name}</div>
        )
    }
}

class ContextComponents extends React.Component{
    render(){
        // 使用一个Provider来将当前的theme传递给以下组件树
        // 无论多深，任何组件都能读取这个值
        return (
            <ThemeContext.Provider value={{name: 123}}>
                <Toolbar />
            </ThemeContext.Provider>
        )
    }
}
export default ContextComponents




const NameContext = createContext({name: 1 , setCountLove: (value: any)=>{}})
NameContext.displayName = 'NameContext'

const Count = memo(() => {
  const [count, setCount] = useState(1)
  
  console.log('NameContext', 65)
  return (
    <NameContext.Consumer>
      {
        ({name, setCountLove}) => {
          return (
            <button onClick={() => {
              setCountLove(name + 1)
            }}>按钮哦{name}</button>
          )
        }
      }
    </NameContext.Consumer>
  )
})


function ContextFn(){
  const [count, setCount] = useState(0)
  function setCountLove(value){
    setCount(value)
  }
  return (
    <NameContext.Provider value={{name: count, setCountLove}}>
      <Count />
    </NameContext.Provider>
  )
}

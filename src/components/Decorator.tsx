import React from 'react'

function A(WrappedComponent){
    return class extends React.Component {
      render(){
        return (
          <>
            <WrappedComponent {...{name: 1}} />
          </>
        )
      }
    }
  }
  
  class ComponentB extends React.Component {
    render(){
      return (
        // @ts-ignore
        <div>我是组件B{this.props.name}</div>
      )
    }
  }
  
  function Foo(params){
    params.title = 'itclanCoder'
    params.prototype.decorator = 'decorator 装饰器，即 @ + 函数名'
  }
  @Foo
  class ComponentA extends React.Component {
    render(){
      return (
        <div>
          {/* @ts-ignore */}
          <p>{ComponentA.title} {}</p>
        </div>
      )
    }
  }
  
  function Fooa(isAble: string){
    return function(target){
      target.isAble = isAble
    }
  }
  @Fooa('plad')
  class ComponentAA extends React.Component {
    render(){
      return (
        <div>
          123
          {/* @ts-ignore */}
          {ComponentAA.isAble}
        </div>
      )
    }
  }
  
  export {
      ComponentA,
      ComponentAA
  }
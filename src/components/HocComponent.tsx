import React, { Component, forwardRef, useState } from "react";
/**
 * 操作props
 * 通过传给了高阶组件返回的组件WrappedComponent，这样可以获得props的控制权（这种方法叫做属性代理）
 * https://juejin.cn/post/6844904050236850184#heading-23
 */
const HOC = (WrappedComponent) => {
    const Love = ({forwardedRef}) => {
        console.log(forwardedRef, 'forward')
        return <WrappedComponent ref={forwardedRef} />
    }
    // class LogProps extends React.Component {
    //     componentDidUpdate(prevProps) {
    //       console.log('old props:', prevProps);
    //       console.log('new props:', this.props);
    //     }
    
    //     render() {
    //     //   @ts-ignore
    //       const {forwardedRef, ...rest} = this.props;
    
    //       // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
    //       return <Component ref={forwardedRef} {...rest} />;
    //     }
    //   }
    
      // 注意 React.forwardRef 回调的第二个参数 “ref”。
      // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
      // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
      return React.forwardRef((props, ref) => {
        //   @ts-ignore
        return <Love {...props} forwardedRef={ref} />;
      });
}

// class HocComponent extends Component {
//     constructor(props){
//         super(props)
//         console.log(this.props, 'forwed')
//     }
//     render(){
//         return (
//             <>
//                 {/* @ts-ignore */}
//             <input/>
//             </>
//         )
//     }
// }

const HocComponent = forwardRef<HTMLDivElement>((props, ref) => {
    console.log(props, ref, '123')
        return <div ref={ref}>123</div>
})

class FancyButton extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>123</div>
        )
    }
  }


/**
 * refs的引用
 * 可以拿到被包裹组件的实例引用Ref
 */



export const HocDemo1 =  HOC(HocComponent)
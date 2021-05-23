
import React, { PropsWithChildren, ReactNode } from 'react'
/**
 * FancyButton使用React.forwardRef来获取传递给它的ref，然后转发到它渲染的DOM
 */
const FancyButton = React.forwardRef<HTMLButtonElement, PropsWithChildren<ReactNode>>((props, ref) => (
    <button ref={ref} className="fancy-button">
        {props.children}
    </button>
))

class FancyButtonComponent extends React.Component {
    myRef: React.RefObject<HTMLButtonElement>
    constructor(props){
        super(props)
        this.myRef = React.createRef<HTMLButtonElement>()
        this.getFancyButton = this.getFancyButton.bind(this)
    }
    getFancyButton(){
        console.log(this.myRef)
    }
    render() {
        return (
            <div onClick={this.getFancyButton}>
                <FancyButton ref={this.myRef}>获取refs</FancyButton>
            </div>
        )
    }
}

export default FancyButtonComponent




// const FancyButton = React.forwardRef<HTMLButtonElement, PropsWithChildren<ReactNode>>((props, ref) => {
//     return (
//       <button ref={ref} className="fancy-button">{props.children}</button>
//     )
//   })
  const ref = React.createRef<HTMLButtonElement>()
  const refDom = React.createRef<HTMLButtonElement>()
  
  function logProps(Component){
    class LogProps extends React.Component<PropsWithChildren<{forwardedRef: React.ForwardedRef<HTMLButtonElement>}>> {
      componentDidUpdate(prevProps){
        console.log('old props', prevProps)
        console.log('new props', this.props)
      }
      render(){
        const {forwardedRef, ...rest} = this.props
        return <Component ref={forwardedRef}  />
      }
    }
    return React.forwardRef<HTMLButtonElement, PropsWithChildren<ReactNode>>((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />
    })
  }
  
  class RefButton extends React.Component {
    focus(){
      console.log('focus')
    }
    render(){
      console.log(this.props, 65)
      return (
        // @ts-ignore
        <button ref={this.props.forwardedRef}>{this.props.children}</button>
      )
    }
  }
  
  const RefButtonRef = logProps(RefButton)
  
  // const RefButtonRef = logProps(React.forwardRef((props, ref) => {
  //   // @ts-ignore
  //   return <RefButton ref={ref} {...props} />
  // }))
  
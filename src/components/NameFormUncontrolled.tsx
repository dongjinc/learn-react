import React, { RefObject } from 'react'
class NameFormUncontrolled extends React.Component{
    input: RefObject<HTMLInputElement>
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.input = React.createRef()
    }
    handleSubmit(event: React.ChangeEvent<EventTarget>){
        console.log('A name was submitted:' + this.input.current.value)
        event.preventDefault()
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: 
                    <input type="text" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default NameFormUncontrolled
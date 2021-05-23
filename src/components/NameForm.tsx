import React from 'react'
class NameForm extends React.Component<{}, {value: string}> {
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log(event.target.type, 4)
        this.setState({
            value: event.target.value
        })
    }
    handleSubmit(event: React.ChangeEvent<EventTarget>){
        console.log('提交名字:' + this.state.value)
        event.preventDefault()
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>名字: 
                    <input type="text" value={this.state.value} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        )
    }
}
export default NameForm
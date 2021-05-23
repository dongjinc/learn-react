import React from 'react'
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class TemperatureInput extends React.Component<{scale: string, temperature: string, onTemperatureChange: (temperature: string) => void}, {temperature: string}>{
    constructor(props){
        super(props)
        this.state = {
            temperature: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        // this.setState({
        //     temperature: e.target.value
        // })
        // temperature是由父组件传入的prop，TemperatureInput组件便失去了对它的控制权
        this.props.onTemperatureChange(e.target.value)
    }
    render(){
        // const temperature = this.state.temperature
        const temperature = this.props.temperature
        const scale = this.props.scale
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }
}
export default TemperatureInput
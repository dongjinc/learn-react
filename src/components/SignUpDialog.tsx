import React, { PropsWithChildren } from "react";

function FancyBorder(props: PropsWithChildren<{color: string}>){
    return (
        <div className={`fancy-border-${props.color}`}>
            {props.children}
        </div>
    )
}

function Dialog(props:PropsWithChildren< {title: string, message: string}>){
    return (
    <FancyBorder color="blue">
        <h1>{props.title}</h1>
        <p>{props.message}</p>
        {props.children}
    </FancyBorder>
    )
}

class SignUpDialog extends React.Component<{}, {login: string}> {
    constructor(props){
        super(props);
        this.state = {
            login: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            login: e.target.value
        })
    }
    handleSignUp(){
        console.log(`welcome aboard ! ${this.state.login}`)
        this.setState({
            login: ''
        })
    }
    render(){
        return (
            <Dialog title="Mars Exploration Program" message="How should we refer to you?">
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>Sign Me Up!</button>
            </Dialog>
        )
    }
}

export default SignUpDialog
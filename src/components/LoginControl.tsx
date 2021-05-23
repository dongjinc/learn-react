import React from 'react'
import Gretting from '../views/gretting'
function LoginButton(props){
    return (
        <button onClick={props.onClick}>Login</button>
    )
}

function LogoutButton(props){
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    )
}

class LoginControl extends React.Component<{}, {isLoggedIn: boolean}> {
    constructor(props){
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
        this.state = {
            isLoggedIn: false
        }
    }
    handleLoginClick(){
        this.setState({isLoggedIn:true})
    }
    handleLogoutClick(){
        this.setState({
            isLoggedIn: false
        })
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn
        let button: JSX.Element
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }
        return(
            <div>
                <Gretting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}
export default LoginControl
import React from 'react'

class RefDemo extends React.Component {
    render(){
        return <p>refsDemo</p>
    }
}

class RefComponent extends React.Component {
    myRef: React.RefObject<RefDemo>;
    constructor(props){
        super(props);
        this.myRef = React.createRef()
        this.getRefs = this.getRefs.bind(this)
    }
    getRefs(e: React.ChangeEvent<EventTarget>){
        console.log(this.myRef)
    }
    componentDidMount(){
        console.log('mounted')
    }
    render(){
        return (
            <div>
                <div onClick={this.getRefs}>refs</div>
                <RefDemo ref={this.myRef}  />
            </div>
        )
    }
}
export default RefComponent
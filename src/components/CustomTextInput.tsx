import React from 'react'
class CustomTextInput extends React.Component {
    textInput = null;

    setTextInputRef: (element: any) => void;

    focusTextInput: () => void;

    constructor(props){
        super(props);
        this.textInput = null;
        this.setTextInputRef = element => {
            console.log(element)
            this.textInput = element
        }
        this.focusTextInput = () => {
            if(this.textInput) this.textInput.focus()
        }
    }
    componentDidMount(){
        console.log(12)
        this.focusTextInput();
    }
    render(){
        return (
            <div>
                {/* 使用ref的回调函数将text 输入框DOM节点的引用存储到React */}
                {/* React将在组件挂载时，会调用ref回调函数并传入DOM元素，当卸载时调用它并传入null，在componentDidMount或componentDidUpdate触发前，保证refs一定是最新的 */}
                <input type="text" ref={this.setTextInputRef} />
                <input type="button" value="focus" onClick={this.focusTextInput} />
            </div>
        )
    }
}

export default CustomTextInput
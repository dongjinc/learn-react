
/**
 * 插槽概念
 */
function Pane(props: {left: JSX.Element, right: JSX.Element}){
    return (
        <div className="split-pane">
            <div className="split-pane-left">
                {props.left}
            </div>
            <div className="split-pane-right">
                {props.right}
            </div>
        </div>
    )
}

function Contacts(){
    return <div>Contacts</div>
}

function Chat(){
    return <div>Chat</div>
}

function SplitPane(){
    return (
        <div>
            <Pane left={<Contacts />} right={<Chat />} />
        </div>
    )
}
export default SplitPane
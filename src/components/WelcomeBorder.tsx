
function FancyBorder(props: {color: string, children: JSX.Element[]}){
    return (
        <div className={`fancy-border-${props.color}`}>
            {props.children}
        </div>
    )
}

function Dialog(props: {title: string, message: string}){
    return (
        <FancyBorder color="blue">
            <h1 className="dialog-title">{props.title}</h1>
            <p className="dialog-message">
                {props.message}
            </p>
            {/* {props.children} */}
        </FancyBorder>
    )
}

function WelcomeDialog(){
    return (
        <Dialog title="Welcome" message="Thank you for " />
    )
}
export default WelcomeDialog
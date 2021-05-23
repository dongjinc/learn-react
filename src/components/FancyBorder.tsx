// types -> JSX.Element 
function FancyBorder(props: {color: string, children: JSX.Element[]}){
    return (
        <div className={'FancyBorder FancuBorder-' + props.color}>
            {/* @ts-ignore */}
            {props.children}
        </div>
    )
}
function WelcomeDialog(){
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    )
}
export default WelcomeDialog
function Mailbox(props: {
    unreadMessages: number
}){
    const unreadMessage = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {/* {
                unreadMessage.length > 0 && <h2>
                    you have {unreadMessage.length} unread message
                </h2>
            } */}
            {/* {
                unreadMessage && <h1>Messages: {unreadMessage}</h1>
            } */}
            the user is <b>{unreadMessage ? 'currently': 'not'} message</b>
        </div>
    )
}
export default Mailbox
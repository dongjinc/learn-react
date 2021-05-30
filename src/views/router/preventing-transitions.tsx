import { useState } from 'react'
import { BrowserRouter as Router, Link, Prompt, Route, Switch, useRouteMatch } from 'react-router-dom'

// https://reactrouter.com/web/example/no-match

export default function PreventingTransitionsExample() {
    const match = useRouteMatch()

    return (
        <Router>
            <ul>
                <li>
                    <Link to={match.url}>Form</Link>
                </li>
                <li>
                    <Link to={match.url + '/one'}>One</Link>
                </li>
                <li>
                    <Link to={match.url + '/two'}>Two</Link>
                </li>
            </ul>
            <Switch>
                <Route path={match.path} exact children={<BlockingForm />} />
                <Route path={match.path + "/one"} children={<h3>One</h3>} />
                <Route path={match.path + "/two"} children={<h3>Two</h3>} />
            </Switch>
        </Router>
    )
}
function BlockingForm() {
    const [isBlocking, setIsBlicking] = useState(false)
    return (
        <form onSubmit={event => {
            event.preventDefault();
            // @ts-ignore
            event.target.reset()
            setIsBlicking(false)
        }}>
            <Prompt when={isBlocking} message={location => `Are you sure you want to go to ${location.pathname}`} />
            <p>
                Blocking?
                {isBlocking ? "Yes, click a link or the back button" : "Nope"}
            </p>
            <p>
                <input size={50} placeholder="type something to block transitions" onChange={event => {
                    setIsBlicking(event.target.value.length > 0)
                }} />
            </p>
            <button>Submit to stop blocking</button>
        </form>
    )
}

import { Link, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'

function Topic() {
    const match = useRouteMatch()
    console.log(match, 45)
    const { topicId } = useParams<{ topicId: string }>()

    return (
        <>
            <h3>Requrested topic ID: {topicId}</h3>
            <div>
                <Link to={`${match.url}/love`}>Love</Link>
                <Switch>
                    <Route path={`${match.path}/:topic`}>
                        <Topic1 />
                    </Route>
                    <Route path={`${match.path}`}>
                        <p>欢迎你</p>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

function Topic1() {
    const params = useParams<any>()
    // params -> topicId和topic
    console.log(params, 6969)
    return (
        <div>
            123
            <Redirect to="/">home</Redirect>
        </div>)
}


export default function Topics() {
    const match = useRouteMatch()
    // match.path => Route 上的path ${match.path}/:topicId
    // match.url => 地址栏匹配的内容 ${match.url}/components
    return (
        <div>
            <h2>nestedRouter</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={`${match.path}`}>
                    <h3>
                        Please select a topic.
                    </h3>
                </Route>
            </Switch>
        </div>
    )
}
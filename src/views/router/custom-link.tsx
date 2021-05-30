import { BrowserRouter as Router, Link, Switch, useRouteMatch, Route } from 'react-router-dom'

export default function CustomLinkExample() {
    const match = useRouteMatch()
    return (
        <Router>
            <div>
                <OldSchoolMenuLink
                    activeOnlyWhenExact={true}
                    to={match.url}
                    label="Home"
                />
                <OldSchoolMenuLink to={match.url + '/about'} label="About" />

                <hr />

                <Switch>
                    {/* 
                        Route注意事项
                        1.exact 精确匹配意思，如果为true location.pathname完全匹配时才匹配。放在最前面是如果相同匹配路径时，防止路径产生匹配从而造成内容展示出错
                        2.比如 path="/" path="/foo" 可将前者放在Switch最后面，以作为全局匹配
                     */}
                    <Route exact path={match.path}>
                        <Home />
                    </Route>
                    <Route path={match.path + '/about'}>
                        <About />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }: { label: string, to: string, activeOnlyWhenExact?: boolean }) {
    const match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })
    return (
        <div className={match ? "active" : ""}>
            {match && "> "}
            <Link to={to}>{label}</Link>
        </div>
    )
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}
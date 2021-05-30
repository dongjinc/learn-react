import { createContext, useContext, useState } from "react"
import { Link, Switch, Route, BrowserRouter as Router, useLocation, Redirect, useHistory } from "react-router-dom"

export default function AuthExample() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <h3>AuthExample</h3>
                    <AuthButton />
                    <ul>
                        <li>
                            <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected Page</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/public">
                            <PublicPage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/protected">
                            <PrivateRoute>
                                <Protected />
                            </PrivateRoute>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    )
}

function AuthButton() {
    const auth = useAuth()
    const history = useHistory()
    return auth.user ? (
        <p>
            Welcome!
            <button onClick={() => {
                auth.signout(() => history.push('/auth-example'))
            }}>Sign out</button>
        </p>
    ) : <p>You are not logged in.</p>
}

function PublicPage() {
    return <h3>Public</h3>
}

function LoginPage() {
    const history = useHistory()
    const location = useLocation<{ from: { pathname: string } }>()
    const auth = useAuth()
    const { from } = location.state || { from: { pathname: '/' } }
    function login() {
        console.log(this, 456)
        auth.signin(() => {
            history.replace(from)
        })
    }
    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    )
}

function PrivateRoute({ children, ...rest }) {
    const auth = useAuth()
    return (
        <Route {...rest} render={
            ({ location }) => auth.user ? children : <Redirect to={{ pathname: "login", state: { from: location } }}></Redirect>
        } />
    )
}
function Protected() {
    return (<div>Protected</div>)
}

const AuthContext = createContext<any>({})
function useAuth() {
    return useContext(AuthContext)
}
function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true
        setTimeout(cb, 150)
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false
        setTimeout(cb, 150)
    }
}

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const signin = cb => {
        return fakeAuth.signin(() => {
            setUser('user')
            cb()
        })
    }
    const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null)
            cb()
        })
    }
    return {
        user,
        signin,
        signout
    }
}
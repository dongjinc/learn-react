import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import BaseRoute from './views/router/basic-routing';
import NestedRoute from './views/router/nested-routing';
import ParamsExample from './views/router/params-example';
import AuthExample from './views/router/redirects'
import CustomLink from './views/router/custom-link'
import PreventingTransitions from './views/router/preventing-transitions'
import {Demo1, SearchResults, EffectDemo3, Blub} from './components/useEffect'
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CallbackDemo1, CallbackDemo2 } from "./components/useCallback";
import {StateDemo1, StateDemo2, GoodsStateDemo2, StateDemo3, StateDemo4, StateDemo5, StateDemo6, StateDemo7, StateDemo8} from './components/useState'
import {MemoDemo2} from './components/useMemo'
import {ContextDemo1} from './components/useContext'
import {RefDemo2, RefDemo3} from './components/useRef'
import {StickyContent} from './components/Sticky'
import {FormDemo1} from './components/Form'
import VerticalDemo from './components/CombinationSwiper'
import {AutoLoadingDemo} from './components/Button'
import {CounterDemo1} from './hooks/reducer'
import {UncontrolledDemo1} from './components/UncontrolledComponents'
import {HocDemo1} from './components/HocComponent'
import ModalComponent from './components/Modal'
function Home() {
  const useInputRefs = useRef()
  useEffect(() => {
    console.log(useInputRefs, 'useInputRef')
  }, [])
  return (
      <div>
        {/* @ts-ignore */}
         <HocDemo1 ref={useInputRefs} />
      </div>
  )
}

function About() {
  return <h2>About</h2>
}

const LinkList = [<Link to="/">Home</Link>, <Link to="/base-route">BaseRoute</Link>, <Link to="/users">Users</Link>,
<Link to="/nested-route">NestedRoute</Link>,
<Link to="/params-expamle">ParamsExample</Link>,
<Link to="/auth-example">AuthExample</Link>,
<Link to="/custom-link">CustomLink</Link>,
<Link to="/preventing-transitions">PreventingTransitions</Link>
]

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {
              LinkList.map((el, index) => <li key={index}>{el}</li>)
            }
          </ul>
        </nav>
            <ModalComponent />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/base-route">
            <BaseRoute />
          </Route>
          <Route path="/nested-route">
            <NestedRoute />
          </Route>
          <Route path="/params-expamle">
            <ParamsExample />
          </Route>
          <Route path="/auth-example">
            <AuthExample />
          </Route>
          <Route path="/custom-link">
            <CustomLink />
          </Route>
          <Route path="/preventing-transitions">
            <PreventingTransitions />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;

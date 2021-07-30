import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './lodash'

import 'antd/dist/antd.css';

import './index.css';
import App from './App';
// import Gretting from './views/gretting'
// import LoginControl from './components/LoginControl'
// import MailBox from './components/Mailbox'
// import WarningBanner from './components/WarningBanner'
// import ListItems from './components/ListItems'
// import ListItemsKey from './components/ListItemsKey'
// import ListItemsBlog from './components/ListItemsBlog'
// import NameForm from './components/NameForm'
// import NameFormUncontrolled from './components/NameFormUncontrolled'
// import Calculator from './components/Calculator'
// import reportWebVitals from './reportWebVitals'
import ErrorBoundary from './components/ErrorBoundary'

// const NameFormUncontrolled = React.lazy(() => import('./components/NameFormUncontrolled')) 
// const ContextComponents = React.lazy(() => import('./components/ContextComponent'))

// const FancyBorder = React.lazy(() => import('./components/FancyBorder'))

// const SplitPane = React.lazy(() => import('./components/SplitPane'))
// const WelcomeBorder = React.lazy(() => import('./components/WelcomeBorder'))
// const ErrorBoundaryExample = React.lazy(() => import('./components/ErrorBoundaryExample'))
// const SignUpDialog = React.lazy(() => import('./components/SignUpDialog'))

// const FilterableProductTable = React.lazy(() => import('./components/FilterableProductTable'))

// const RefComponent = React.lazy(() => import('./components/RefComponent'))

// const CustomTextInput = React.lazy(() => import('./components/CustomTextInput'))

// const FancyButton = React.lazy(() => import('./components/FancyButton'))

// const unreadMessage = ['React']
// const numbers = [1,2,3,4,5]
// const posts = [
//   {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
//   {id: 2, title: 'Installation', content: 'You can install React from npm.'}
// ];

// const PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>

  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

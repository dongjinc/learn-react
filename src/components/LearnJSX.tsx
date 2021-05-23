import React from 'react'
import Greeting from '../views/gretting'
/**
 * 深入JSX
 * JSX仅仅是React.createElement(component, props, ...children)函数的语法糖
 */

// 1.指定React元素类型
/**
 * JSX标签的第一部分指定了React元素的类型
 * 1.React必须在作用域内
 */

/**
 * 2.在JSX类型中使用点语法 -> 在一个模块中导出许多React组件时,这会非常方便
 */
const myComponents = {
    DatePicker(props: {color: string}){
        return (
            <div>Imagine a {props.color} deatepicker here .</div>
        )
    }
}
function BlueDatePicker(){
    return (
        <myComponents.DatePicker color="blue" />
    )
}

/**
 * 3.用户定义的组件必须以大写字母开头
 * 以小写字母开头的元素代表一个HTML内置组件 比如: <div> <span>
 * 大写字母开头的元素则对应着在JavaScript引入或自定义的组件 如: <Foo /> 会编译为React.createElement(Foo)
 * 建议使用大写字母开头命名自定义组件. 如果确实需要一个以小写字母开头的组件,则在JSX中使用它之前,必须将它赋值给一个大写字母开头的变量
 */
function Hello(props){
    return (
        <div>Hello {props.toWhat}</div>
    )

}
function HelloWorld(){
    return (<Hello toWhat="World" />)
}

/**
 * 4.运行时选择类型
 * 不能将通用表达式作为React元素类型 -> 如果想通过通用表达式(动态)决定元素类型
 * 需要将它赋值给大写字母开头的变量
 */
const components = {
    photo: 'componentA',
    video: 'componentB',
}
function Story(props){
    // 错误 JSX类型不能是一个表达式
    // return <components[props.storyType] story={props.story} />
    // 要解决该问题,首先将类型赋值给一个大写字母开头的变量
    const SpecificStory = components[props.storyType]
    return <SpecificStory story={props.story} />
}

/**
 * JSX中Props
 * 1.JavaScript表达式作为Props
 * 可以包裹{}中的JavaScript表达式作为一个prop传递给JSX元素
 */
// <Mycomponent foo={ 1 + 2 + 3 + 4 } />
// 在Mycomponent中,props.foo的值等于 1 + 2 + 3 + 4的执行结果 10

// -->  if语句以及for循环不是JavaScript表达式,所以不能在JSX中直接使用

function NumberDescriber(props){
    let description;
    if(props.number % 2 == 0){
        description = <strong>even</strong>
    } else {
        description = <i>odd</i>
    }
    return <div>{props.number} is an {description} number</div>
}

/**
 * 2.字符串字面量
 */
// 将字符串字面量赋值给prop,下面两个JSX表达式是等价的
// <Mycomponent message="hello world" />
// <Mycomponent message={"hello world"} />

// 将字符串字面量赋值给prop时,值是未转义的,以下两个JSX表达式是等价的
// <Mycomponent message="&lt;3" />
// <Mycomponent message={"<3"} />

/**
 * 3.props默认值为"True"
 */
// 如果没有给prop赋值,它默认值是true,以下两个JSX表达式是等价的

// <MyTextBox autocompelte />
// <MyTextBox autocompelte={true} />

// 通常不建议传递 value给prop , 因为可能与ES6对象简写混淆,  {foo}是 {foo: foo}的简写,而不是{foo: true}

/**
 * 4.属性展开
 */
// 如果已经有了一个props对象,可以使用展开运算符 ... 来在JSX中传递整个props对象,以下两个组件时等价的
function App1(){
    return <Greeting  fistName="Ben" lastName="Hector" />
}
function App2(){
    const props = {firstName: 'Ben', lastName: 'Hector'}
    return <Greeting {...props} />
}

// 可以选择只保留当前组件需要接收的props,并使用展开运算符将其他props传递下去
// kind的prop会被安全的留下,将不会被传递给DOM中的button元素
const Button = props => {
    const {kind, ...other} = props
    const className = kind === 'primary' ? 'PrimaryButton': 'SecondaryButton'
    // other 只传递了 onClick和children属性 
    return <button className={className} {...other} />
}

const App = () => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log('clicked')} >Hello World !</Button>
        </div>
    )
}

// 属性展开在某些情况下很有用,也很容易将不必要的props传递给不相关的组件. 或者将无效的HTML属性传递给DOM ->  建议谨慎使用该语句

/**
 * JSX中的子元素
 * 包含在开始和结束标签之间的JSX表达式内容将作为特定属性 props.children传递给外层组件
 * 有几种不同的方法来传递子元素
 */

/**
 * 1.字符串字面量
 */
// 将字符串放在开始和结束标签之间,此时props.children就只是该字符串

// <MyComponent>Hello World</MyComponent>
// 着是一个合法的JSX,MyComponent中的props.children是一个简单的未转义字符串 "Hello World !",因此可以采用编写HTML方式来编写JSX
<div>This is valid HTML &amp; JSX at the same time</div>

// JSX会一处行首尾以及空行.与标签相邻的空行均被删除 
// 文本字符串之间的新行会被压缩为一个空格,以下几种方式都是等价的

/**
<div>Hello World</div>

<div>
    Hello World
</div>

<div>
    Hello
    World
</div>

<div>
    
    Hello World
</div>
 */

// https://zh-hans.reactjs.org/docs/jsx-in-depth.html 子元素
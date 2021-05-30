/**
 * 高阶组件
 */
import React from 'react'
class CommentList extends React.Component {
    state: {
        // 假设"DataScource"是个全局范围内的数据源变量
        // @ts-ignore
        comments: any
    }
    constructor(props) {
        super(props)
        this.state = {
            // 假设"DataScource"是个全局范围内的数据源变量
            // @ts-ignore
            comments: DataSource.getComments()
        }
    }
    componentDidMount() {
        // 订阅更改
        // @ts-ignore
        DataSource.addChangeListener(this.handleChange)
    }
    componentWillUnmount() {
        // 清除订阅
        // @ts-ignore
        DataSource.remoceChangeListener(this.handleChange)
    }
    handleChange() {
        // 当数据源更新时，更新组件状态
        this.setState({
            // @ts-ignore
            comments: DataSource.getComments()
        })
    }
    render() {
        return (
            <div>
                {/* @ts-ignore */}
                {this.state.comments.map((comment) => (
                    // @ts-ignore
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        )
    }
}

class BlogPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // @ts-ignore
            blogPost: DataSource.getBlogPost(props.id)
        }
    }
    componentDidMount() {
        // @ts-ignore
        DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        // @ts-ignore
        DataSource.removeChangeListener(this.handleChange)
    }
    handleChange() {
        this.setState({
            // @ts-ignore
            blogPost: DataSource.getBlogPost(this.props.id)
        })
    }
    render() {
        // @ts-ignore
        return (<TextBlock text={this.state.blogPost} />)
    }
}
// CommentList和BlogPost不同 - 它们在DataSource上调用不同的方法，且渲染不同的结果。但它们的大部分实现都是一样的
/**
 * 1.挂载时，向DataSource添加一个更改侦听器
 * 2.在侦听器内部，当数据源发生变化时，调用setState
 * 3.在卸载时，删除侦听器
 */

// 可以想象，在一个大型应用程序中，这种订阅和调用的模式将一次又一次地发生。需要一个抽象，在一个地方定义这个逻辑，并在许多组件之间共享它。这就是高阶组件擅长的地方

// 此函数接受一个组件。。。
function withSubscription(WrappedComponent, selectData) {
    // 并返回另一个组件。。
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                // @ts-ignore
                data: selectData(DataSource, props)
            }
            this.handleChange = this.handleChange.bind(this)
        }
        componentDidMount() {
            // @ts-ignore
            DataSource.addChangeListener(this.handleChange)
        }
        componentWillUnmount() {
            // @ts-ignore
            DataSource.removeChangeListener(this.handleChange)
        }
        handleChange() {
            this.setState({
                // @ts-ignore
                data: selectData(DataSource, this.props)
            })
        }
        render() {
            return (
                // 使用新数据渲染被包装的组件
                // 请注意，我们可能还会传递其他属性
                // @ts-ignore
                <WrappedComponent data={this.state.data} {...this.props} />
            )
        }
    }
}

/**
 * 1.高阶组件不会修改传入的组件，也不会使用继承来复制其行为
 * 2.相反HOC通过将组件包装在容器组件中组成新组件。HOC是纯函数，没有副作用
 */
const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments())
// @ts-ignore
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource) => DataSource.getBlogPost(props.id))


/**
 * 不要改变原始组件。使用组合
 * 不要试图在HOC中修改组件原型(或以其他方式改变它)
 */
function logProps(InputComponent) {
    InputComponent.prototype.componentDidUpdate = function (prevProps) {
        console.log('current props', this.props)
        console.log('previous props:', prevProps)
    }
    // 返回原始的 input 组件，暗示它已经被修改
    return InputComponent
}
/**
 * 这样做会产生不良后果
 * 其一：输入组件再也无法像HOC增强之前那样使用了。
 * 其二：再用另一个同样会修改componentDidUpdate的HOC增强它。前面的HOC就会失效（原型链覆盖）
 * 其三：HOC也无法应用于没有生命周期的函数组件
 */

// 修改传入组件的HOC是一种糟糕的抽象方式。
// HOC不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能
function logPropsHoc(WrappedComponent) {
    return class extends React.Component {
        componentDidUpdate(preProps) {
            console.log('current props: ', this.props)
            console.log('previous props: ', preProps)
        }
        render() {
            return (
                // 将 input 组件包装在容器中，不对其进行修改。
                <WrappedComponent {...this.props} />
            )
        }
    }
}
/**
 * 该HOC与上下文中修改传入组件的HOC功能相同，同时避免了出现冲突的情况。
 * 同样适用于class组件和函数组件。因为它是一个纯函数。
 * 它可以与其他HOC组件，甚至可以与其自身组合
 */

/**
 * HOC与容器组件模式之间由相似之处。容器组件担任将高级和低级关注点分离的责任，由容器管理订阅和状态。
 * 并将prop传递给处理UI的组件。
 * HOC使用容器作为其实现的一部分，将HOC是为传输化容器组件
 */

// 约定：将不相关的props传递给被包裹的组件
/**
 * HOC为组件添加特性。自身不应该大幅改变约定
 * HOC返回的组件与原组件应该保持类型的接口
 */
class PropsHoc extends React.Component {
    render() {
        // 过滤掉非此HOC额外的props，且不要进行透传
        // @ts-ignore
        const { extraProp, ...PassThroughProps } = this.props
        // 将props注入到被包装的组件中
        // 通常为state的值或者实例方法
        // @ts-ignore
        const injectedProp = someStateOrInstanceMethod;
        // 
        return (
            // @ts-ignore
            <WrappedComponent injectedProp={injectedProp} {...PassThroughProps} />
        )
    }
}
// 这种确定保证了HOC的灵活性以及可复用性

// 约定：最大化可组合性
/**
 * 并不是所有HOC都一样，有时仅接受一个参数。被包裹的组件
 */
// @ts-ignore
const NavBarWithRouter = withRouter(Navbar)

/**
 * relay-react
 */

/**
 * redux
 */

// 约定：包装显示名称以便轻松调试
/**
 * HOC创建的容器组件会与任何其他组件一样，会显示在React Developer Tools中。为了方便调试，请选择一个显示名称，以表明它是HOC的产物
 */
function WithSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {
    }
    // @ts-ignore
    WithSubscription.displayName = `WithSubscription ${getDisplayName(WrappedComponent)}`
    return WithSubscription
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name ||
        'Component'
}
/**
 * 注意事项
 */
// 不要在render方法中使用HOC
/**
 * React的diff算法(称为协调),使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树
 * 如果从render返回的组件与前一个渲染中的组件相同(===)，则React通过将子树与新子树进行区分来递归更新子树.如果不相等，则完全卸载前一个子树
 * 通常，不需要考虑这点，但对HOC来说这一点很重要
 * 因为这代表着你不能在应用组件的render方法中对一个组件应用HOC
 */
class Demo extends React.Component {
    render() {
        // 每次调用 render 函数都会创建一个新的 EnhancedComponent
        // EnhancedComponent1 !== EnhancedComponent2
        // @ts-ignore
        const EnhancedComponent = enhance(MyComponent);
        // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
        return <EnhancedComponent />;
    }
}
/**
 * 这不仅仅是性能问题 - 重新挂载组件会导致该组件及其所有子组件的状态丢失
 * 如果在组件之外创建HOC,这样以来组件只会创建一次.每次render时都会是同一个组件
 * 极少数情况下,需要动态调用HOC.可以在组件的生命周期方法或其构造函数中进行调用
 */

// 务必复制静态方法
/**
 * 有时在React组件上定义静态方法很有用.
 * 将HOC应用于组件时,原始组件将使用容器组件进行包装.这意味着新组件  -> 没有原始组件的任何静态方法
 */

// 定义静态函数
// @ts-ignore
WrappedComponent.staticMethod = function () { }
// 现在使用HOC
// @ts-ignore
const EnhanceComponent = enhance(WrappedComponent)
// 增强组件没有 staticMethod
// @ts-ignore
typeof EnhanceComponent.staticMethod === 'undefined'

// -> 为了解决这个问题 可以在返回之前把这些方法拷贝到容器组件上
function enhance(WrappedComponent) {
    class Enhance extends React.Component { }
    // 必须准确知道应该拷贝哪些方法
    // @ts-ignore
    Enhance.staticMethod = WrappedComponent.staticMethod;
    return Enhance
}
// -> 要这样做.需要知道那些方法应该被拷贝 可以使用 hoist-no-react-statics 自动拷贝所有非React静态方法
import hoistNonReactStatic from 'hoist-non-react-statics'
function enhanceHoist(WrappedComponent) {
    class Enhance extends React.Component { }
    hoistNonReactStatic(Enhance, WrappedComponent)
    return Enhance
}
// -> 除了导出组件,另一个可行的方案就是再额外导出这个静态方法
// 使用这种方式代替...
// @ts-ignore
MyComponent.someFunction = someFunction;
// @ts-ignore
export default MyComponent
// @ts-ignore
export { someFunction }

// 要使用的组件中, import它们
// @ts-ignore
import MyComponent, { someFunction } from './xx'
// Refs不会被传递
/**
 * 高阶组件约定,将所有props传递给被包装组件,这对于refs并不适用
 * 因为ref实际上并不是一个prop - 就像 key一样
 * 它由React专门处理的,如果ref添加到HOC的返回组件中,则ref引用指向容器组件,而不是被包装组件
 * 该问题的解决方案通过使用 React.forwardRef API
 */
// 再高阶组件中转发 refs


class FancyButtonRefs extends React.Component<{ name: string }> {
    constructor(props) {
        super(props)
    }
    focus() {
        // ....
    }
    // ...
    render() {
        return (
            <div>123</div>
        )
    }
}

function logPropsHocRefs(WrappedComponent: typeof FancyButtonRefs) {
    class LogProps extends React.Component {

        componentDidUpdate(prevProps) {
            console.log('old props: ', prevProps)
            console.log('new props: ', this.props)
        }
        render() {
            return (
                // 需要注意: refs将不会透传下去 因为ref不是prop属性与key一样 其被React进行了特殊处理
                // 如果对HOC添加了ref 该ref将引用最外层的容器组件,而不是被包裹的组件
                // 这意味着我们FancyButton组件的refs实际上被挂载到LogProps组件
                <WrappedComponent {...this.props} name={'123'} />
            )
        }
    }
    return LogProps
}

// 我们导出LogProps,而不是FancyButton
// 虽然它也会渲染一个FancyButton
// @ts-ignore
export default logPropsHocRefs(FancyButtonRefs)


// 通过导入FancyButton组件是高阶组件(HOC) LogProps 
import FancyButton from './FancyButton'
const ref = React.createRef();
// 尽管渲染结果将是一样的。但我们的ref将指向LogProps，而不是内部的FancyButton组件
// 这意味着我们不能调用例如ref.current.focus这样的方法
// @ts-ignore
<FancyButton label="click me" handleClick={this.handleClick} ref={ref} />

// 幸运的是，我们可以使用React.forwardRef Api明确地将refs转发到内部的FancyButton组件
// React.forwardRef接受一个渲染函数。其接受props和ref参数并返回一个React节点

function LogPropsForwardeRef(Component) {
    class LogPropsed extends React.Component<{ forwardRef: React.ForwardedRef<LogPropsed> }> {
        componentDidUpdate(prevProps) {
            console.log('old Props: ', prevProps)
            console.log('new Props: ', this.props)
        }
        render() {
            const { forwardRef, ...rest } = this.props
            // 将自定义的props属性 "forwardedRef"定义为ref
            return <Component ref={forwardRef} {...rest} />
        }
    }
    // 注意 React.forwardRef回调的第二个参数"ref"
    // 我们可以将其作为常规prop属性传递给LogProps。
    // 然后它就可以被挂载到被 LogProps 包裹的子组件上
    return React.forwardRef<LogPropsed>((props, ref) => {
        return <LogPropsed {...props} forwardRef={ref} />
    })
}
const LogPropsForward = LogPropsForwardeRef(FancyButton)

function renderLogPropsForward() {
    return (
        // @ts-ignore
        <LogPropsForward ref={ } />
    )
}

// 在DevTools中显示自定义名称
// React.forwardRef 接受一个渲染函数。React DevTools使用该函数来决定为ref转发组件显示的内容
// 例如，以下组件将在DevTools中显示为 "ForwardRef"
const WarppedComponent = React.forwardRef((props, ref) => {
    // @ts-ignore
    return <LogProps {...props} forwardedRef={ref} />
})
// 如果你命名了渲染函数，DevTools也将包含其名称 (例如：ForwardRef(myFunction))
const WarppedComponent1 = React.forwardRef(function myFunction(props, ref) {
    // @ts-ignore
    return <LogProps {...props} forwardedRef={ref} />
})
// 甚至可以设置函数displayName属性

function LogProps(Component) {
    class LogProps extends React.Component {
        // ...
    }
    function forwardRef(props, ref) {
        return <LogProps {...props} forwardedRef={ref} />
    }
    // 在DevTools中为该组件提供一个更有用的显示名。
    // 例如"ForWardRed(logProps(MyComponent))"
    const name = Component.displayName || Component.name || 'Component';
    forwardRef.displayName = `logProps(${name})`
    return React.forwardRef(forwardRef)
}
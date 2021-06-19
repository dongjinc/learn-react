import React, {
  Component,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// hooks 解决的问题
// 1.类组件的不足
//  1).状态逻辑难复用
//  2).趋向复杂难以维护

/**
 * 
 useState
 1.hook内部使用Object.is来比较新/旧state是否相等
 2.与class组件中的setState方法不同,如果修改状态的时候,传的状态值没有变化,则不重新渲染
 3.与class组件中的setState方法不同,useState不会自动合并更新对象.可用函数式的setState结合展开运算符来达到合并更新对象的效果
 */

/**
 * 函数组件和状态组件setState区别
 * 1.修改状态的时候，传的状态值没有变化 -> 函数组件不会重新渲染 、 class组件需要重新渲染
 * 2.setState和useState -> 函数组件不会自动合并更新对象(结合展开运算符来达到合并更新对象的效果)-直接替换、class组件会自动合并更新对象
 */

// 函数组件中 如果修改状态,传入的状态值没有变化,则不重新渲染
export function StateDemo1() {
  const [counter, setCount] = useState({ name: "计数器", number: 0 });
  console.log("render Counter");
  return (
    <>
      <button onClick={() => setCount(counter)}>++</button>
    </>
  );
}

// class组件中setState相同值时 会触发重新渲染
export class StateDemo3 extends Component<{}, { name: string }> {
  constructor(props) {
    super(props);
    this.state = {
      name: "张三",
    };
    this.onNameChange = this.onNameChange.bind(this);
  }
  onNameChange() {
    this.setState({
      name: "张三",
    });
  }
  render() {
    console.log("init");
    return (
      <div>
        {this.state.name}
        <button onClick={this.onNameChange}>changeName</button>
      </div>
    );
  }
}

/**
 * 减少渲染次数
 * 默认情况,只要父组件状态变了(不管组件依不依赖该状态),子组件也会重新渲染
 * 一般优化
 * 1.类组件:可以使用pureComponent
 * 2.函数组件:使用React.memo,会返回一个新的组件,如果接受的属性不变,则不重新渲染函数
 * 深入优化
 * 1.useCallback: 接收一个内联回调函数参数和一个依赖项数组(子组件依赖父组件的状态,即子组件会用到父组件的值),useCallback会返回该回调函数memoized版本,该回调函数仅在某个依赖项改变时才会更新
 * 2.useMemo: 把创建函数和依赖项数组作为参数传入useMemo,它仅会在某个依赖项改变时才重新计算memoized值,有助于避免在每次渲染时进行高开销的计算
 */
function SubCounter({ onClick, data }) {
  console.log("Subcounter render");
  return <button onClick={onClick}>{data.number}</button>;
}
const SubCounters = memo(SubCounter);
// 开销大
export function StateDemo2() {
  console.log("init");
  const [name, setName] = useState("计算器");
  const [number, setNumber] = useState(0);
  // 使用useState,每次更新都是独立的,因此对象 {} === {} -> false,以及addClick同理,会导致子组件刷新,即使number没有变化
  const data = { number };
  const addClick = () => {
    setNumber(number + 1);
  };
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SubCounters data={data} onClick={addClick} />
    </>
  );
}
let oldData, oldAddClick;
// 优化后
export function GoodsStateDemo2() {
  console.log("init");
  const [name, setName] = useState("计算器");
  const [number, setNumber] = useState(0);
  // 父组件更新时,这里的变量和函数每次都会重新创建,那么子组件接收到的属性每次都会认为是最新的
  // 所以子组件也会随之更新,这时候可用到useMemo
  // 有没有后面的依赖项数组很重要,否则还是会重新渲染
  // 如果后面的依赖项数组没有值,即使父组件的number值改变了,子组件也不会去更新
  // const data = useMemo(() => ({number}), [])
  const data = useMemo(() => ({ number }), [number]);
  console.log(oldData === data, "1");
  oldData = data;
  const addClick = useCallback(() => {
    setNumber((number) => number + 1);
  }, []);
  console.log(oldAddClick === addClick, "2");
  oldAddClick = addClick;
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SubCounters data={data} onClick={addClick} />
    </>
  );
}

/**
 * - useState里数据务必为immutable(不可变)
 * 因为只要调用setState就会触发更新。但是使用useSate时，在更新函数里传入同一个对象将无法触发更新。
 */

export function StateDemo4() {
  const [list, setList] = useState([9, 2, 11, 5, 4, 8, 12, 0]);
  console.log(123);
  return (
    <>
      <ol>{list && list.map((v) => <li key={v}>{v}</li>)}</ol>
      <button
        onClick={() => {
          // 不会更新
          // setList(list.sort((a, b) => a - b))
          // setList(list.slice().sort((a, b) => a - b))
        }}
      >
        sort
      </button>
    </>
  );
}

/**
 * https://juejin.cn/post/6959885030063603743
 * - setState、useState同步异步问题
 * 合成事件、生命周期 异步，贯穿react整个流程
 * 异步事件、原生事件 同步
 */

/**
 * useState -> 连续执行两个useState
 */
export function StateDemo5() {
  const [a, setA] = useState(1);
  const [b, setB] = useState("b");
  const handleClickWithPromise = () => {
    Promise.resolve().then(() => {
      // 执行了两次render
      setA((a) => a + 1);
      setB("bb");
    });
  };
  const handleClickWithoutPromise = () => {
    // 执行了一次render
    setA((a) => a + 1);
    setB("bb");
  };
  return (
    <>
      <button onClick={handleClickWithPromise}>
        {a}-{b} 异步执行
      </button>
      <button onClick={handleClickWithoutPromise}>
        {a}-{b} 同步执行
      </button>
    </>
  );
}

// 同步和异步情况下 连续执行两次同一个useState
export function StateDemo6() {
  const [a, setA] = useState(1);
  const handleClickWithPromise = () => {
    Promise.resolve().then(() => {
      // 两次setA各自render一次，分别2， 3
      setA((a) => a + 1);
      setA((a) => a + 1);
    });
  };
  const handleClickWithoutPromise = () => {
    // 两次setA都执行，只render一次
    setA((a) => a + 1);
    setA((a) => a + 1);
  };
  console.log("render", a);
  return (
    <>
      <button onClick={handleClickWithPromise}>{a} 异步执行</button>
      <button onClick={handleClickWithoutPromise}>{a} 同步执行</button>
    </>
  );
}

/**
 * setState
 * 连续执行两个setState
 * 与useState结果一致
 */
export class StateDemo7 extends React.Component<{}, { a: number; b: string }> {
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
      b: "b",
    };
  }
  handleClickWithPromise = () => {
    Promise.resolve().then(() => {
      // 执行了两次render
      this.setState({
        ...this.state,
        a: 2,
      });
      this.setState({
        ...this.state,
        b: "2",
      });
    });
  };
  handleClickWithoutPromise = () => {
    // 执行了一次render
    this.setState({
      ...this.state,
      a: 2,
    });
    this.setState({
      ...this.state,
      b: "2",
    });
  };
  render() {
    console.log("render", this.state);
    return (
      <>
        <button onClick={this.handleClickWithPromise}>异步执行</button>
        <button onClick={this.handleClickWithoutPromise}>同步执行</button>
      </>
    );
  }
}
// 同步和异步情况下 连续执行两次同一个setState
export class StateDemo8 extends React.Component<{}, { a: number }> {
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
    };
  }
  handleClickWithPromise = () => {
    //   两次setState各自render一次，分别打印2，3
    Promise.resolve().then(() => {
      this.setState({ a: this.state.a + 1 });
      this.setState({ a: this.state.a + 1 });
    });
  };
  handleClickWithoutPromise = () => {
    // 两次setState合并，只执行了最后一次（与useState不同）
    this.setState({ a: this.state.a + 1 });
    this.setState({ a: this.state.a + 1 });
  };
  render() {
    console.log("render", this.state);
    return (
      <>
        <button onClick={this.handleClickWithPromise}>异步执行</button>
        <button onClick={this.handleClickWithoutPromise}>同步执行</button>
      </>
    );
  }
}
/**
 * 总结
 * - 在react涉及范围内的事件流（合成事件，生命周期 ）- 异步执行
 * setState和useState是异步执行的 (不会立即更新state的结果）
 * 多次执行setState和useState，只会调用一次render
 * 不同的是，setState会进行state合并，而useState不会合并
 * 
 * - 在setTimeout、Promise.then等异步事件中 - 同步执行
 * setState和useState是同步执行的（立即更新state的结果）
 * 多次执行setState和useState，每次执行的setState和useState都会调用一次render
React的setState本身并不是异步的，是因为其批处理机制给人一种异步的假象。

【React的更新机制】

生命周期函数和合成事件中：

无论调用多少次setState，都不会立即执行更新。而是将要更新的state存入'_pendingStateQuene',将要更新的组件存入'dirtyComponent';
当根组件didMount后，批处理机制更新为false。此时再取出'_pendingStateQuene'和'dirtyComponent'中的state和组件进行合并更新；
原生事件和异步代码中：

原生事件不会触发react的批处理机制，因而调用setState会直接更新；
异步代码中调用setState，由于js的异步处理机制，异步代码会暂存，等待同步代码执行完毕再执行，此时react的批处理机制已经结束，因而直接更新。
总结：
react会表现出同步和异步的现象，但本质上是同步的，是其批处理机制造成了一种异步的假象。（其实完全可以在开发过程中，在合成事件和生命周期函数里，完全可以将其视为异步） 


 */

/**
 * - setState 同步异步问题
 * 原生事件（同步）
 */
// export class StateDemo7 extends React.Component<{},{count: number}> {
//     constructor(props){
//         super(props)
//         this.state = {
//             count: 0
//         }
//         this.onCountChange = this.onCountChange.bind(this)
//     }
//     componentDidMount(){
//         // 原生事件
//         window.addEventListener('click', this.onCountChange, false)
//     }
//     onCountChange(){
//         this.setState({
//             count: this.state.count + 1
//         })
//         console.log(this.state.count)
//     }
//     render(){
//         return (
//             <button>{this.state.count}</button>
//         )
//     }
// }
/**
 * - useState同步异步问题
 * 异步事件（同步）
 */
// export class StateDemo8 extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             a: 1,
//             b: 'b'
//         }
//     }
//     handleClickWithPromise(){
//         Promise.resolve(() => {
//             this.setState({

//             })
//         })
//     }
// }

// useState 源码

// let firstWorkInProgressHook = {memoizedState: null, next: null};
// let workInProgressHook;

// function useState(initState) {
//     let currentHook = workInProgressHook.next ? workInProgressHook.next : {memoizedState: initState, next: null};

//     function setState(newState) {
//         currentHook.memoizedState = newState;
//         render();
//     }
//   	// 这就是为什么 useState 书写顺序很重要的原因
// 		// 假如某个 useState 没有执行，会导致指针移动出错，数据存取出错
//     if (workInProgressHook.next) {
//         // 这里只有组件刷新的时候，才会进入
//         // 根据书写顺序来取对应的值
//         // console.log(workInProgressHook);
//         workInProgressHook = workInProgressHook.next;
//     } else {
//         // 只有在组件初始化加载时，才会进入
//         // 根据书写顺序，存储对应的数据
//         // 将 firstWorkInProgressHook 变成一个链表结构
//         workInProgressHook.next = currentHook;
//         // 将 workInProgressHook 指向 {memoizedState: initState, next: null}
//         workInProgressHook = currentHook;
//         // console.log(firstWorkInProgressHook);
//     }
//     return [currentHook.memoizedState, setState];
// }

// function Counter() {
//     // 每次组件重新渲染的时候，这里的 useState 都会重新执行
//     const [name, setName] = useState('计数器');
//     const [number, setNumber] = useState(0);
//     return (
//         <>
//             <p>{name}:{number}</p>
//             <button onClick={() => setName('新计数器' + Date.now())}>新计数器</button>
//             <button onClick={() => setNumber(number + 1)}>+</button>
//         </>
//     )
// }

// function render() {
//     // 每次重新渲染的时候，都将 workInProgressHook 指向 firstWorkInProgressHook
//     workInProgressHook = firstWorkInProgressHook;
//     ReactDOM.render(<Counter/>, document.getElementById('root'));
// }

// render();

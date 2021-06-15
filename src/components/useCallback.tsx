import { memo, useCallback, useEffect, useState } from "react";
/**
 * useCallback 设计初衷并非解决组件内部函数多次创建的问题，而是减少子组件的不必要重复渲染
 1.减少重新render的次数，因为React最好耗费性能的就是调和过程，只要不render就不会触发reconciliation
 2.减少计算量
 3.缓存函数
 */
//  如果遇到父组件方法传给子组件时，并且子组件的渲染成本特别高时，可以采用对父组件方法通过useCallback和memo结合
function CallbackDemo2Component1({ onclickA }) {
  console.log("component1 - init");
  return (
    <div>
      <button onClick={onclickA}>component1</button>
    </div>
  );
}
function CallbackDemo2Component2({ onclickB }) {
  console.log("component2 - init");
  return (
    <div>
      <button onClick={onclickB}>component2</button>
    </div>
  );
}
const MemoCallbackDemo2Component2 = memo(CallbackDemo2Component2);
export function CallbackDemo2() {
  const [dataA, setDataA] = useState(0);
  const [dataB, setDataB] = useState(0);
  const onClickA = () => {
    setDataA((o) => o + 1);
  };
  // CallbackDemo2Component2 是一个渲染成本非常高的组件，点击CallbackDemo2Component1时，也会导致2重新渲染。即使dataB并未发生改变。
  // 原因就是onClickB被重新定义，导致React在diff新旧组件时，判定组件发生了变化

  // 改造前
  // const onClickB = () => {
  //     setDataB(o => o +1)
  // }
  // 改造后
  const onClickB = useCallback(() => {
    setDataB(o => o + 1);
  }, []);
  return (
    <div>
      {dataA}: {dataB}
      <CallbackDemo2Component1 onclickA={onClickA} />
      <MemoCallbackDemo2Component2 onclickB={onClickB} />
    </div>
  );
}

// 源码 -> 核心逻辑比较deps是否发生变化，如果有变化则返回新的callback函数，否则返回原函数
// 其中比较方法areaHookInputsEqual内部实际调用了React的is工具方法

export function CallbackDemo1() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setTimeout(() => {
      setData([1, 2, 3]);
    }, 3000);
  }, []);
  console.log(data, "data");
  const memoizedCallback = useCallback(
    (count) => {
      console.log(count, data);
      setCount(count + 1);
    },
    [data]
  ); // 如果数组
  return (
    <div>
      count: {count}
      <button onClick={() => memoizedCallback(count)}>click</button>
    </div>
  );
}

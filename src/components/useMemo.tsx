import { memo, useMemo, useState } from "react";

export default {};
/**
 *创建memoV的开销时没有必要的。只有当创建行为本身会产生高昂的开销（比如计算上千次才会生成变量值），才有必要用useMemo
   useMemo可减少计算量
   1.useMemo有着暂存能力的，暂存了上一次的结果
   2.缓存值
 */

function MemoDemo1() {
  const v = 0;
  const memoV = useMemo(() => v, []);
  return <div>{memoV}</div>;
}



// 1.父组件内数据需要通过计算处理，传递给子组件时，可通过useMemo
export function MemoDemo2(){
  const [count, setCount] = useState(0)
  const [name, setName] = useState('rose')
  // 父组件需要处理的数据，传递给子组件时，可通过useMemo，防止子组件重复渲染 -- 值的缓存
  const data = useMemo(() => {
    return {
      name
    }
  }, [name])
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>update count</button>
      <MemoDemo2Child data={data} />
    </div>
  )
}

const MemoDemo2Child = memo<any>(({data}) => {
  console.log('child init')
  return (
    <div>
      <p>child</p>
      <div>{data.name}</div>
    </div>
  )
})

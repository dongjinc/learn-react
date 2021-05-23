import React from 'react'
/**
 * Fragment
 * React中一个常见模式，一个组件返回多个元素。
 * Fragement允许你将子列表分组，无需向DOM添加额外节点 -> 类似于 tempalte/block
 */
// 1.动机 一种常见模式是组件返回一个子元素列表
class Table extends React.Component {
    render(){
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        )
    }
}
/**
 * <Columns />需要返回多个<td>元素以使得渲染的HTML有效
 * 如果在<Columns /> render() 中使用了父 div，则生成的HTML将无效
 */

// class Columns extends React.Component {
//     render(){
//         return (
//             <div>
//                 <td>Hello</td>
//                 <td>World</td>
//             </div>
//         )
//     }
// }

// Fragments解决了这个问题

// 用法
/**
 class Columns extends React.Component {
    render(){
        return(
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        )
    }
 }
 */
// 短语法
// 可以像使用任何其他元素一样使用<> </>, 除了不支持key或属性
class Columns extends React.Component {
    render(){
        return (
            <>
                <td>Hello</td>
                <td>World</td>
            </>
        )
    }
}

// 带key的Fragments
/**
 * 使用显示<React.Fragment>语法声明的片段可能具有key
 * 使用场景 -> 将一个集合映射到一个Fragments数组
 * key是唯一可以传递给Fragment的属性
 */
function Glossary(props){
    return (
        <dl>
            {props.items.map(item => (
                // 没有key,React会发出一个关键警告
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dt>{item.description}</dt>
                </React.Fragment>
            ))}
        </dl>
    )
}
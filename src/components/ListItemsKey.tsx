function ListItem(props:{key:string, value: number}){
    console.log(props.key, 52)
    // 这里不需要指定key
    return <li>{props.value}</li>
}

function NumberList(props: {numbers: number[]}){
    const numbers = props.numbers
    const listItems = numbers.map(number => 
            <ListItem key={number.toString()} value={number} />
        )
        return (
            <ul>{listItems}</ul>
        )
}

export default NumberList
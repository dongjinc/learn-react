interface Posts  {
    id: number
    title: string
    content: string
}

function Blog(props: {posts: Posts[]}){
    const sidebar = (
        <ul>
            {props.posts.map(post => <li key={post.id}>{post.content}</li>)}
        </ul>
    )
    const content = props.posts.map(post => 
    <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
    </div>)
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    )
}
export default Blog
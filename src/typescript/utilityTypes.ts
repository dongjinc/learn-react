
// Partial<Type> all properties of type set to optional
export interface Todo2 {
    title: string
    description: string
}

function updateTodo(todo: Todo2, fieldsToUpdate: Partial<Todo>){
    return {...todo, ...fieldsToUpdate}
}
const todo3 = {
    title: 'organize desk',
    description: 'clear clutter'
}

const todo4 = updateTodo(todo3, {
    description: 'throw out trash'
})


// Required<Type> all properties of Type set to required
interface Props {
    a?: number
    b?: string
}
const obj: Props = {a: 5}
const obj2: Required<Props> = {a: 4, b: '2'}

// Readonly<Type> all properties of Type set to readonly
interface Todo5 {
    title: string
}

// const todo: Readonly<Todo5> = {
//     title: 'Delete inactive users'
// }
// todo.title = 123


// Record<keys, Types> 
interface CatInfo {
    age: number
    breed: string
}

type CatName = "miffy" | "boris" | "mordred"

const cats: Record<CatName, CatInfo> = {
    miffy: {age: 10, breed: 'person'},
    boris: {age: 5, breed: 'love'},
    mordred: {age: 1, breed: 'a'}
}


// Pick
interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = Pick<Todo, "title" | "completed">
  
  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false
  }

//   Omit
interface Todo {
    createAt: number
}
// removing keys
type TodoPreview1 = Omit<Todo, 'createAt' | 'completed'>

const todo1: TodoPreview1 = {
    title: 'aini',
    description: 'mk'
}
// Exclude<Type, ExcludeUnion(排除)>
type T0 = Exclude<'a' | 'b' | 'c', 'c'>
type T1 = Exclude<string | number | (() => void), Function>

// Extract<Type, Union>
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'c'>

// excluding null and undefined from Type
type T3 = NonNullable<string | number | undefined>



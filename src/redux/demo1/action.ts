import { actionType } from "./actionType";

const add = (num) => ({
    type: actionType.INSERMENT,
    payload: num
})

const dec = (num) => ({
    type: actionType.DECREMENT,
    payload: num
})

const reset = (num) => ({
    type: actionType.RESET,
    payload: num
})

export {
    add,
    dec,
    reset
}
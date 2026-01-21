
interface Action {
    type: string;
    payload?: [string, unknown]
}


interface State {
    cart: { [key: string]: unknown };
}


const initialState:State={
    cart:{}
}

export default function RootReducer(state=initialState, action:Action)
{
    switch(action.type)
    {
        case 'ADD_CART':
            if (!action.payload) return state;  
            state.cart[action.payload[0]]=action.payload[1]
            console.log("CARTTTTTTTTTTTTTTTTT",state.cart)
            return {cart:state.cart}
           
        case 'DELETE_CART':
            if (!action.payload) return state;  
            delete state.cart[action.payload[0]]
            console.log("CARTTTTTTTTTTTTTTTTT",state.cart)
            return {cart:state.cart}


        default:
            return {cart:state.cart}
    }
    
}
export type RootState = State;


interface Action {
    type: string;
    payload?: [string, unknown]
}


interface State {
    cart: { [key: string]: unknown };
    user: { [key: string]: unknown };

}


const initialState:State={
    cart:{},
    user:{}
}

export default function RootReducer(state=initialState, action:Action)
{
    switch(action.type)
    {
        case 'ADD_CART':
            if (!action.payload) return state;  
            state.cart[action.payload[0]]=action.payload[1]
            console.log("CARTTTTTTTTTTTTTTTTT",state.cart)
            return {cart:state.cart, user:state.user}
           
        case "ADD_USER":
            if (!action.payload) return state;  
            state.user[action.payload[0]]=action.payload[1]
            localStorage.setItem("USER",JSON.stringify(state.user))
            return {cart:state.cart,user:state.user}
        
        case 'DELETE_CART':
            if (!action.payload) return state;  
            delete state.cart[action.payload[0]]
            console.log("CARTTTTTTTTTTTTTTTTT",state.cart)
            return {cart:state.cart, user:state.user}

        case 'EMPTY_CART':
            // if (!action.payload) return state;  
            state.cart={}
            console.log("CARTTTTTTTTTTTTTTTTT",state.cart)
            return {cart:state.cart, user:state.user}


        default:
            return state
    }
    
}
export type RootState = State;

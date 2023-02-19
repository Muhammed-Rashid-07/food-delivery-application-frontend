import React, { createContext, useContext, useReducer } from 'react'


//This code creates a React context for a shopping cart feature, which includes a state and a dispatch function to update the state using a reducer.

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        //if the action type is ADD
        case "ADD":
            //it will return a new array
            return [...state, { id: action.id, name: action.name, img: action.img, price: action.price, qty: action.qty, size: action.size }];
        //spread operator is used to create a new array that includes all the items in the array. along with new objects that represent the item being added to the cart.
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state];
            const index = arr.findIndex((food) => food.id === action.id);

            if (index !== -1) {
                arr = [...arr.slice(0, index), { ...arr[index], qty: parseInt(action.qty) + arr[index].qty, price: action.price + arr[index].price }, ...arr.slice(index + 1)];
            }
        
            return arr;
        case "DROP":
            let empArray = []
            return empArray;
        default:
            console.log("error in Reducer");
    }
}
export const CartProvider = ({ children }) => {
    //the cartProvider component uses 'useReducer' to manage the state and dispatch function
    //created from the reducer function and passes the value to the 2 context providers using 'value' prop.

    const [state, dispatch] = useReducer(reducer, []);
    //useReducer take 2 arguments: 1.function 2. initialState.

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
    //This allows any components nested within to access the dispatch and state values without the need for prop drilling.
}


export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
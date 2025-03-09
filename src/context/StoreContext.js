import { createContext, useContext, useReducer } from "react";

export const StoreContext = createContext(null);

const initialState = {
  cart: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "CLEAR_CART":  
      return {
        ...state,
        cart: [],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload:itemId });
  };

  const clearCart = () => { 
    dispatch({ type: "CLEAR_CART" });
  };
  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const clearUser = () => {
    dispatch({ type: "SET_USER", payload: null });
  };
  const contextValue = {
    cart: state.cart,
    user: state.user, 
    addToCart,
    removeFromCart,
    clearCart,
    setUser,
    clearUser
  };
  

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => useContext(StoreContext);

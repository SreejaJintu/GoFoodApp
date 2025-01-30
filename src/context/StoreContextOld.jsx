import { createContext } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // const [food_list,setFood_list]=useState([])
  const contextValue = {
  };


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

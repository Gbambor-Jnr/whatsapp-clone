import { useReducer } from "react";
import WhatsappContext from "./whatsapp-context";

const initialState = {
  user: "",
};

const reducer = (state, action) => {
  if (action.type === "SET-USER") {
    return { ...state, user: action.payload };
  }

  return initialState;
};

const ContextProvider = (props) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  const login = (user) => {
    dispatch({ type: "SET-USER", payload: user });
  };

  const defaultValue = {
    user: appState.user,
    login: login,
  };

  return (
    <WhatsappContext.Provider value={defaultValue}>
      {props.children}
    </WhatsappContext.Provider>
  );
};

export default ContextProvider;

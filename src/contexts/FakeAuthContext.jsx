import { createContext, useContext, useReducer } from "react";

const authContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action");
  }
}

function FakeAuthContext({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return <authContext.Provider>{children}</authContext.Provider>;
}

function useAuth() {
  const context = useContext(authContext);

  if (context === undefined)
    throw new Error("Context is called out of context");

  return context;
}

export { FakeAuthContext, useAuth };

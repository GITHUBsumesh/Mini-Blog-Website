import { render } from "preact";
import App from "./app.jsx";
import { createContext } from "preact";
import { useState } from "preact/hooks";

export const server = "http://localhost:4000/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};
render(<AppWrapper />, document.getElementById("app"));

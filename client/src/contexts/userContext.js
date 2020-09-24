import React, { createContext, useContext, useReducer, useEffect } from "react";

export const UserContext = createContext(null);

const initialValue = {
  user: null,
};

const reducer = (state, { type, user }) => {
  switch (type) {
    case "login":
      return {
        ...state,
        user,
      };

    case "logout":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 401) {
        dispatch({
          type: "logout",
        });
        return;
      } else if (res.status === 200) {
        const {
          data: { user },
        } = await res.json();
        if (user) {
          dispatch({
            type: "login",
            user,
          });
        }
      }
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

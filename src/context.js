import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = props => {
  const [value, setValue] = useState({
    totalPages: 0,
    totalPosts: 0
  });

  return (
    <Context.Provider value={[value, setValue]}>
      {props.children}
    </Context.Provider>
  );
};

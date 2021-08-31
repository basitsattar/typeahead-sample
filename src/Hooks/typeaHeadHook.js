import { useState, useLayoutEffect } from "react";

const Hook = () => {
  const [state, setState] = useState({
    suggestions: [],
    text: "",
    items: [],
    focusedItems: [],
  });

  useLayoutEffect(() => {
    // getting users profile from github api
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => setState((prevState) => ({ ...prevState, items: data })));
  }, []);

  return {
    state,
    onChangeTextHandler: (e) => {
      let suggestions = [];
      const value = e.target.value;
      if (value === "") {
        setState((prevState) => ({
          ...prevState,
          focusedItems: prevState.items.slice(0, 4),
          text: value,
        }));
      } else {
        if (value.length > 0) {
          const regex = new RegExp(`^${value}`, `i`);
          suggestions = state.items.sort().filter((el) => regex.test(el.login));
        }
        setState((prevState) => ({
          ...prevState,
          focusedItems: [],
          suggestions,
          text: value,
        }));
      }
    },

    onBlurHandler: () => {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          suggestions: [],
          text: "",
          focusedItems: [],
        }));
      }, 200);
    },
    onFocusHandler: () => {
      setState((prevState) => ({
        ...prevState,
        focusedItems: prevState.items.slice(0, 4),
      }));
    },
  };
};

export default Hook;

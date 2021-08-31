import React from "react";
import typeaHeadHook from "../Hooks/typeaHeadHook";

function TypeaHead() {
  //calling custom hook
  const { state, onFocusHandler, onChangeTextHandler, onBlurHandler } =
    typeaHeadHook();

  const pushToGithubRoute = (route) => {
    window.open(route, "_blank");
  };

  const renderSuggestions = (values) => {
    if (values.length === 0) {
      return null;
    }
    return (
      <ul>
        {values.map((el, index) => (
          <li onClick={() => pushToGithubRoute(el.html_url)} key={index}>
            <img
              src={el.avatar_url}
              alt={el.avatar_url}
              className="profile__image"
            />
            <h3>{el.login}</h3>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div onBlur={onBlurHandler} className="container">
      <h1 className="heading">Typeahead</h1>
      <div className="typehead">
        <input
          onFocus={onFocusHandler}
          onChange={onChangeTextHandler}
          placeholder="Search profile"
          value={state.text}
          type="text"
        />
        {state.focusedItems.length > 0
          ? renderSuggestions(state.focusedItems)
          : state.suggestions.length > 0 &&
            renderSuggestions(state.suggestions)}
      </div>
    </div>
  );
}

export default TypeaHead;

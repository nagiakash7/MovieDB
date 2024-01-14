const iState = {
  firstname: {},
}

const reducer = (state = iState, action) => {
  if (action.type === 'CHANGE_FIRSTNAME') {
    return {
      ...state,
      firstname: action.payload,
    };
  }

  return state;
}

export default reducer;

import { fromJS } from "immutable";

// acions
const COLLAPSE = "COLLAPSE";

// reducer
const initialState = {
  collapse: false
};

export const component = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case COLLAPSE:
    return  state.update("collapse",value=>!value)
    default:
      return state;
  }
};

export const handleCollapse = () => {
  return { type: COLLAPSE };
};

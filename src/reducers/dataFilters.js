import { initialDataFilters } from "../config.js";

const dataFilters = (
  state = {
    available: initialDataFilters,
    selected: []
  },
  action
) => {
  switch (action.type) {
    case "SELECT_DATA_FILTER":
      let selected = [...state.selected, [action.key, action.value]];
      return { ...state, ...{ selected: selected } };
    case "REMOVE_DATA_FILTER":
      selected = state.selected.filter(f => {
        return f[0] != action.key;
      });
      return { ...state, ...{ selected: selected } };
    case "START_FILTER_UPDATE":
      // prepare to update the choices for all the children
      // of a specific filter.
      let available = [...state.available];

      // if (action.parentKey != undefined) {
      // catches the initial request for top-level filter
      let parent = available.find(f => f.key == action.parentKey);
      parent.value = action.parentValue;
      // }

      // start with the first child and go down from there
      let key = action.key;
      while (key != undefined) {
        let filter = available.find(f => f.key == key);
        filter.choices = { isFetching: key == action.key, items: [] };
        filter.value = null;
        let child = available.find(f => f.parentKey == key);
        key = child != undefined ? child.key : undefined;
      }
      return { ...state, ...{ available: available } };
    case "RECIEVE_FILTER_CHOICES":
      available = [...state.available];
      let filter = available.find(f => f.key == action.key);
      filter.choices = {
        isFetching: false,
        items: action.items != undefined ? action.items : []
      };
      filter.value = null;
      return { ...state, ...{ available: available } };
    default:
      return state;
  }
};

export default dataFilters;

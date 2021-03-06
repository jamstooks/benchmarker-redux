import { addOrRemove } from "../utils";

const selectedEntities = (state = [], action) => {
  switch (action.type) {
    case "ADD_ENTITY":
      let e = { ...action.entity, ...{ selectedVersions: [] } };
      return [...state, e];
    case "REMOVE_ENTITY":
      return state.filter(e => {
        return e.id !== action.entityID;
      });
    case "TOGGLE_VERSION":
      /**
       * Find the specific entity and either add or remove
       * the specified version from `selectedVersions`.
       */
      return state.map(e => {
        if (e.id === action.entityID) {
          let tempEntity = { ...e };

          let updatedVersions = addOrRemove(
            tempEntity.selectedVersions,
            action.versionID,
            (a, b) => a === b
          );

          tempEntity.selectedVersions = updatedVersions;
          return tempEntity;
        }
        return e;
      });
    default:
      return state;
  }
};

export default selectedEntities;

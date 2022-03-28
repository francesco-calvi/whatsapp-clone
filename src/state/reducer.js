export const initialState = {
  user: null,
  dbUserId: null,
  chats: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DB_UID: "SET_DB_UID",
  SET_CHATS: "SET_CHATS",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_DB_UID:
      return {
        ...state,
        dbUserId: action.dbUserId,
      };
    case actionTypes.SET_CHATS:
      return {
        ...state,
        chats: action.chats,
      };

    default:
      return state;
  }
};

export default reducer;

export const initialState = {
  user: null,
  dbUserId: null,
  chats: null,
  showNewChatForm: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DB_UID: "SET_DB_UID",
  SET_CHATS: "SET_CHATS",
  SET_SHOW_NEWCHAT_FORM: "SET_SHOW_NEWCHAT_FORM",
};

const reducer = (state, action) => {
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

    case actionTypes.SET_SHOW_NEWCHAT_FORM:
      return {
        ...state,
        showNewChatForm: action.showNewChatForm,
      };

    default:
      return state;
  }
};

export default reducer;

export const initialState = {
  user: null,
  dbUserId: null,
  chats: null,
  showNewChatForm: false,
  showStartNewChatButton: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DB_UID: "SET_DB_UID",
  SET_CHATS: "SET_CHATS",
  SET_SHOW_NEWCHAT_FORM: "SET_SHOW_NEWCHAT_FORM",
  SET_SHOW_START_NEWCHAT_BUTTON: "SET_SHOW_START_NEWCHAT_BUTTON",
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

    case actionTypes.SET_SHOW_NEWCHAT_FORM:
      return {
        ...state,
        showNewChatForm: action.showNewChatForm,
      };

    case actionTypes.SET_SHOW_START_NEWCHAT_BUTTON:
      return {
        ...state,
        showStartNewChatButton: action.showStartNewChatButton,
      };

    default:
      return state;
  }
};

export default reducer;

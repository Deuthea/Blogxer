import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import noteReducer from "./note.reducer";

const rootReducer = combineReducers({
  userReducer,
  noteReducer,
});

export default rootReducer;

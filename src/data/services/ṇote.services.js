import { api, getAuthHeaders, get, post, update, del } from "./services.common";
export const addNoteAPI = async (data) => {
  //path e.g.
  let url = `${api}/notes/addNote`;
  let authHeader = getAuthHeaders();
  return await post(url, data, { ...authHeader });
};
export const getNoteAPI = async () => {
  //another path e.g.
  let url = `${api}/notes/`;
  let authHeader = getAuthHeaders();
  return await get(url, { ...authHeader });
};

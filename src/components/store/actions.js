export const searchResult = data => ({ type: "SEARCH_SUCCESS", data });
export const loginToken = data => ({ type: "LOGIN_TOKEN", data });
export const login = (data) => ({ type:"LOGIN", payload:data });
export const logout = (data) => ({ type:"LOGOUT" });
export const search = (data) => ({ type:"SEARCH", payload:data });
export const nextPage = (data) => ({ type:"NEXT_PAGE", payload:data });
export const nextPageResult = (data) => ({ type:"NEXT_PAGE_RESULT", payload:data });

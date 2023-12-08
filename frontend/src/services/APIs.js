const BASE_URL = process.env.REACT_APP_URL
console.log(BASE_URL);

//USER ENDPOINTS
export const endpoints = {
    USERS_URL: BASE_URL +'/users',
    TEAM_URL: BASE_URL +'/team',
    FILTER_URL: BASE_URL+'/filter'
}

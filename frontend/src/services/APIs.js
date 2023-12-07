const BASE_URL ='http://localhost:5001/api'
console.log(BASE_URL);

//USER ENDPOINTS
export const endpoints = {
    USERS_URL: BASE_URL +'/users',
    TEAM_URL: BASE_URL +'/team',
    FILTER_URL: BASE_URL+'/filter'
}

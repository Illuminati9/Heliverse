import { endpoints } from '../APIs.js'
import { setUserData, setLoading,setDisplayData, setDomains,setGenders } from '../../slices/userSlice.js'
import {apiConnector} from '../apiConnector.js'

const { USERS_URL, FILTER_URL } = endpoints;

export function getAllUsers(){
    return async (dispatch) =>{
        dispatch(setLoading(true));
        try {
            console.log(USERS_URL);
            const response = await apiConnector("GET",USERS_URL+'/');
            console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUserData(response.data.users));
            dispatch(setDisplayData(response.data.users));
            const uniqueDomains = [...new Set(response.data.users.map(item => item.domain))];
            const uniqueGender = [...new Set(response.data.users.map(item=> item.gender))];
            dispatch(setDomains(uniqueDomains));
            dispatch(setGenders(uniqueGender))
            
        } catch (error) {
            console.log('GET ALL USERS DATA Error', error);

        }
        dispatch(setLoading(false))
    }
}

export async function getUser(id){
    let result ;
    try {
        const response = await apiConnector('GET',USERS_URL+'/'+id);
        console.log(response.data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.user;
        console.log(result);
    } catch (error) {
        console.log('Get particular user error',error);
        result=null;
    }
    return result;
}

export function createUser(data){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST',USERS_URL,data);
    
            console.log(response.data);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
             
            const response2 = await apiConnector('GET',USERS_URL);
            if(!response2.data.success){
                throw new Error(response2.data.message);
            }
            
            dispatch(setUserData(response2.data.users));

        } catch (error) {
            console.log('Creating user error',error);
        }
        dispatch(setLoading(false))
    } 
}

export function updateUser(data,id){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('PUT',USERS_URL+'/'+id,data);
    
            console.log(response.data);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
             
            const response2 = await apiConnector('GET',USERS_URL);
            if(!response2.data.success){
                throw new Error(response2.data.message);
            }
            
            dispatch(setUserData(response2.data.users));

        } catch (error) {
            console.log('Updating user error',error);
        }
        dispatch(setLoading(false))
    } 
}

export function deleteUser(id){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('DELETE',USERS_URL+'/'+id);
    
            console.log(response.data);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
             
            const response2 = await apiConnector('GET',USERS_URL);
            if(!response2.data.success){
                throw new Error(response2.data.message);
            }
            
            dispatch(setUserData(response2.data.users));
        } catch (error) {
            console.log('Deleting user error',error)
        }
        dispatch(setLoading(false));
    }
}

export function filterData(search,page,gender,domain){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            let URL = FILTER_URL+'?';
            if(search!==null){
                URL= `${URL}search=${search}&`
            }
            if(page!==null){
                URL=`${URL}page=${page}&`
            }
            if(gender!==null){
                URL = `${URL}gender=${gender}&`
            }
            if(domain!==null){
                URL=`${URL}domain=${domain}&`
            }
            const response = await apiConnector('GET',URL);
            console.log(response.data);
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const response2 = await apiConnector('GET',USERS_URL);
            if(!response2.data.success){
                throw new Error(response2.data.message);
            }

            dispatch(setUserData(response2.data.users));

        } catch (error) {
            console.log('Filtering data error',error);
        }
    }
}
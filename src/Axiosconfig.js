import axios from "axios";
import {url} from "./ApiHelper"

export const config = ()=>{
    let token = JSON.parse(localStorage.getItem('Token'));
    return axios.create({
        baseURL:`${url}`,
        headers:{
            Authorization: 'Bearer ' + token
        }
    })
}
export const loginConfig=()=>{
    return axios.create({
        baseURL:`${url}`
    })
}
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.huggy.app/v3/',
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
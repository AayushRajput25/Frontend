
import axios from "axios";
import { createError, createUrl } from "./utils";

export async function SignInUser(email, password){
    try { 
        const url = 'http://localhost:8080/users/signin';
        const body = {
            email, password}
        
        const response = await axios.post(url, body)
        return response.data;
    }
    catch (ex){
        return createError(ex)
    }

}
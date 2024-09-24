import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    LOGIN_ACCOUNT: "/api/auth/login",
}

class AuthService {

    loginAccount = (data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.LOGIN_ACCOUNT, data);
    }

}

const authService = new AuthService();
export default authService;
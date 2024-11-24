import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_CUSTOMER: "/api/customers",
    ADMIN_DETAIL_CUSTOMER: "/api/customers/",
    ADMIN_POST_CUSTOMER: "/api/customers",
    ADMIN_UPDATE_CUSTOMER: "/api/customers/",
    ADMIN_DELETE_CUSTOMER: "/api/customers/",
}

class CustomerService {
    // ADMIN
    adminListCustomer = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_CUSTOMER, config);
    }

    adminDetailCustomer = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_CUSTOMER + id, config);
    }

    adminCreateCustomer = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_CUSTOMER, data, config);
    };

    adminUpdateCustomer = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_CUSTOMER + id, data, config)
    };

    adminDeleteCustomer = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_CUSTOMER + id, config);
    }
}

const customerService = new CustomerService();
export default customerService;

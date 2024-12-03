import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PAYMENT_POLICY: "/api/PaymentPolicy",
    ADMIN_DETAIL_PAYMENT_POLICY: "/api/PaymentPolicy/",
    ADMIN_POST_PAYMENT_POLICY: "/api/PaymentPolicy",
    ADMIN_UPDATE_PAYMENT_POLICY: "/api/PaymentPolicy/",
    ADMIN_DELETE_PAYMENT_POLICY: "/api/PaymentPolicy/",
};

class PaymentPolicyService {
    // ADMIN
    adminListPaymentPolicy = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PAYMENT_POLICY, config);
    }

    adminDetailPaymentPolicy = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PAYMENT_POLICY + id, config);
    }

    adminCreatePaymentPolicy = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_PAYMENT_POLICY, data, config);
    };

    adminUpdatePaymentPolicy = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PAYMENT_POLICY + id, data, config);
    };

    adminDeletePaymentPolicy = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_PAYMENT_POLICY + id, config);
    }
}

const paymentPolicyService = new PaymentPolicyService();

export default paymentPolicyService;

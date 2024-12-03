import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_CONTRACT_PAYMENT_DETAILS: "/api/contract-payment-details",
    ADMIN_DETAIL_CONTRACT_PAYMENT_DETAIL: "/api/contract-payment-details/",
    ADMIN_POST_CONTRACT_PAYMENT_DETAIL: "/api/contract-payment-details",
    ADMIN_UPDATE_CONFIRM_CONTRACT_PAYMENT_DETAIL: "/api/contract-payment-details/confirm/",
    ADMIN_DELETE_CONTRACT_PAYMENT_DETAIL: "/api/contract-payment-details/",
    ADMIN_DETAIL_CONTRACTID_PAYMENT_DETAIL: "/api/contract-payment-details/contract/",
    ADMIN_UPDATE_CONTRACT_PAYMENT_DETAIL: "/api/contract-payment-details/",
};

class ContractPaymentDetailService {
    // ADMIN
    adminListContractPaymentDetails = () => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_CONTRACT_PAYMENT_DETAILS, config);
    };

    adminDetailContractPaymentDetail = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_CONTRACT_PAYMENT_DETAIL + id, config);
    };

    adminCreateContractPaymentDetail = (data) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_CONTRACT_PAYMENT_DETAIL, data, config);
    };

    adminUpdateContractPaymentDetail = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_CONTRACT_PAYMENT_DETAIL + id, data, config);
    };
    adminConFirmContractPaymentDetail = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_CONFIRM_CONTRACT_PAYMENT_DETAIL + id, data, config);
    };

    adminDeleteContractPaymentDetail = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_CONTRACT_PAYMENT_DETAIL + id, config);
    };
    
    adminGetContractPaymentDetailsByContractId = (contractID) => {
        const config = {
            headers: {
                "content-type": "text/plan",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_CONTRACTID_PAYMENT_DETAIL + contractID, config);
    };

}

const contractPaymentDetailService = new ContractPaymentDetailService();
export default contractPaymentDetailService;
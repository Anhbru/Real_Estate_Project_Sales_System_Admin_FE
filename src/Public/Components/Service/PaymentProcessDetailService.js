import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenApi} from "./ContractService";

const API_ENDPOINT = {
    ADMIN_LIST: "/api/payment-process-details",
    ADMIN_DETAIL_: "/api/payment-process-details/",
    ADMIN_CREATE_: "/api/payment-process-details",
    ADMIN_UPDATE_: "/api/payment-process-details/",
    ADMIN_DELETE_: "/api/payment-process-details/",
};

class PaymentProcessDetailService {
    getList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST, configTokenApi);
    };

    adminDetail = (id) => {
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_ + id, configTokenApi);
    }

    adminCreate = (data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_, data, configTokenApi);
    };

    adminUpdate = (id, data) => {
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_ + id, data, configTokenApi);
    };

    adminDelete = (id) => {
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_ + id, configTokenApi);
    };
}

const paymentProcessDetailService = new PaymentProcessDetailService();

export default paymentProcessDetailService;
import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenJson} from "../../Contants/Contatns";
import {configTokenFormData} from "../../Contants/Contatns";

const API_ENDPOINT = {
    ADMIN_LIST: "/api/payment-processes",
    ADMIN_DETAIL_: "/api/payment-processes/",
    ADMIN_CREATE_: "/api/payment-processes",
    ADMIN_UPDATE_: "/api/payment-processes/",
    ADMIN_DELETE_: "/api/payment-processes/",
    
};

class PaymentProcessService {
    getList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST, configTokenJson);
    };

    adminDetail = (id) => {
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_ + id, configTokenJson);
    }

    adminCreate = (data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_, data, configTokenJson);
    };

    adminUpdate = (id, data) => {
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_ + id, data, configTokenFormData);
    };

    adminDelete = (id) => {
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_ + id, configTokenJson);
    };
}

const paymentProcessService = new PaymentProcessService();

export default paymentProcessService;

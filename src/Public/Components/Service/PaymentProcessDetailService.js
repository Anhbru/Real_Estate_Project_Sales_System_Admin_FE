import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenJson} from "../../Contants/Contatns";
import {configTokenFormData} from "../../Contants/Contatns";

const API_ENDPOINT = {
    ADMIN_LIST: "/api/payment-process-details",
    ADMIN_DETAIL_: "/api/payment-process-details/",
    ADMIN_CREATE_: "/api/payment-process-details",
    ADMIN_UPDATE_: "/api/payment-process-details/",
    ADMIN_DELETE_: "/api/payment-process-details/",
    ADMIN_GET_BY_PAYMENTPROCESSID:"/api/payment-process-details/paymentProcess/"
};

class PaymentProcessDetailService {
    getList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST, configTokenJson);
    };

    adminDetail = (id) => {
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_ + id, configTokenJson);
    }

    adminGetByPaymentProcessId = (pmtId) => {
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_GET_BY_PAYMENTPROCESSID + pmtId , configTokenJson);
    }
    // adminGetByPaymentProcessId = (pmtIdValue) => {
    //     return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_GET_BY_PAYMENTPROCESSID, {
    //         ...configTokenJson,
    //         params: { pmtId: pmtIdValue }  // This will append ?pmtId=<value> to the URL
    //     });
    // }
    

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

const paymentProcessDetailService = new PaymentProcessDetailService();

export default paymentProcessDetailService;

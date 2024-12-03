import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenJson} from "../../Contants/Contatns";

const API_ENDPOINT = {
    LIST: "/api/promotion-details",
    DETAIL: "/api/promotion-details/",
    CREATE: "/api/promotion-details",
    UPDATE: "/api/promotion-details/",
    DELETE: "/api/promotion-details/",
};

class PromotionDetailService {
    getList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenJson);
    };

    detail = (id) => {
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.DETAIL + id, configTokenJson);
    }

    create = (data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE, data, configTokenJson);
    };

    update = (id, data) => {
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.UPDATE + id, data, configTokenJson);
    };

    delete = (id) => {
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE + id, configTokenJson);
    };
}

const promotionDetailService = new PromotionDetailService();

export default promotionDetailService;

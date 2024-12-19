import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenFormData, configTokenJson} from "../../Contants/Contatns";

const API_ENDPOINT = {
    LIST: "/api/property-categorys",
    CREATE: "/api/property-categorys",
    DETAIL: "/api/property-categorys/",
    UPDATE: "/api/property-categorys/",
    DELETE: "/api/property-categorys/",
};

class PropertyCategoryService {
    getList = async () => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenJson);
    };

    create = async (data) => {
        return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE, data, configTokenJson);
    };

    update = async (id, data) => {
        return await axios.put(BASE_URL_SERVER + API_ENDPOINT.UPDATE + id, data, configTokenFormData);
    };

    detail = async (id) => {
        return await axios.get(BASE_URL_SERVER + API_ENDPOINT.DETAIL + id, configTokenJson);
    };

    delete = async (id) => {
        return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE + id, configTokenJson);
    };
}

const propertyCategoryService = new PropertyCategoryService();
export default propertyCategoryService;

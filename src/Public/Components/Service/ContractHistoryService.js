import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_CONTRACT_HISTORYS: "/api/contracthistorys",
    ADMIN_DETAIL_CONTRACT_HISTORY: "/api/contracthistorys/",
    ADMIN_POST_CONTRACT_HISTORY: "/api/contracthistorys",
    ADMIN_UPDATE_CONTRACT_HISTORY: "/api/contracthistorys/",
    ADMIN_DELETE_CONTRACT_HISTORY: "/api/contracthistorys/",
    ADMIN_DETAIL_CONTRACT_HISTORY_CONTRACT: "/api/contracthistorys/contract/",
};

class ContractHistoryService {
    // ADMIN
    adminListContractHistorys = () => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_CONTRACT_HISTORYS, config);
    };

    adminDetailContractHistory = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_CONTRACT_HISTORY + id, config);
    };

    adminCreateContractHistory = (data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_CONTRACT_HISTORY, data, config);
    };

    adminUpdateContractHistory = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_CONTRACT_HISTORY + id, data, config);
    };

    adminDeleteContractHistory = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_CONTRACT_HISTORY + id, config);
    };
    getContractHistorysByContractID = (contractID) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_CONTRACT_HISTORY_CONTRACT + contractID, config);
    };
}

const contractHistoryService = new ContractHistoryService();
export default contractHistoryService;

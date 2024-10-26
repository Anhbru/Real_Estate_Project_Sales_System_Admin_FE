import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_SALES_POLICY: "/api/sales-policys",
    ADMIN_DETAIL_SALES_POLICY: "/api/sales-policys/",
    ADMIN_POST_SALES_POLICY: "/api/sales-policys",
    ADMIN_UPDATE_SALES_POLICY: "/api/sales-policys/",
    ADMIN_DELETE_SALES_POLICY: "/api/sales-policys/",
};

class SalesPolicyService {
    adminListSalesPolicy = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_SALES_POLICY, config);
    };

    adminDetailSalesPolicy = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_SALES_POLICY + id, config);
    };

    adminCreateSalesPolicy = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_SALES_POLICY, data, config);
    };

    adminUpdateSalesPolicy = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_SALES_POLICY + id, data, config);
    };

    adminDeleteSalesPolicy = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_SALES_POLICY + id, config);
    };
}

const salesPolicyService = new SalesPolicyService();
export default salesPolicyService;

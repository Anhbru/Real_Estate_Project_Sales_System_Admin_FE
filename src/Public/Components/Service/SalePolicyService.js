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

    adminCreateSalesPolicy = async (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        try {
            const response = await axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_SALES_POLICY, data, config);
            return response;
        } catch (error) {
            console.error("Error creating sales policy:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                throw new Error(error.response.data.message || "Error creating sales policy");
            } else {
                throw new Error("Network error or server did not respond");
            }
        }
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

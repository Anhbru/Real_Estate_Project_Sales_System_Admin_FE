import axios from 'axios';
import { BASE_URL_SERVER } from '../config/server';

const API_ENDPOINT = {
    ADMIN_LIST_OPENSALES: "/api/open-for-sales",
    ADMIN_DETAIL_OPENSALE: "/api/open-for-sales",
    ADMIN_POST_OPENSALE: "/api/open-for-sales",
    ADMIN_UPDATE_OPENSALE: "/api/open-for-sales",
    ADMIN_DELETE_OPENSALE: "/api/open-for-sales"
};

class OpenSaleService {
    adminListOpenSales = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_OPENSALES, config);
    };

    adminDetailOpenSale = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_OPENSALE + id, config);
    };

    adminCreateOpenSale = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_OPENSALE, data, config);
    };

    adminUpdateOpenSale = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_OPENSALE + id, data, config);
    };

    adminDeleteOpenSale = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_OPENSALE + id, config);
    };
}

const openSaleService = new OpenSaleService();
export default openSaleService;

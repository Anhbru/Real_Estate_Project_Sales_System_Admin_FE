import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PROPERTY: "/api/propertys",
    ADMIN_DETAIL_PROPERTY: "/api/propertys/",
    ADMIN_POST_PROPERTY: "/api/propertys",
    ADMIN_UPDATE_PROPERTY: "/api/propertys/",
    ADMIN_DELETE_PROPERTY: "/api/propertys/",
    ADMIN_SELECT_PROPERTY_CUSTOMER: "/api/propertys/select",
    ADMIN_CATEGORY_DETAIL: "/api/propertys/property-not-sale/",
};

class PropertyService {
    // ADMIN
    adminListProperty = (page) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PROPERTY + '?page=' + page, config);
    }

    adminDetailProperty = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROPERTY + id, config);
    }

    adminCreateProperty = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_PROPERTY, data, config);
    };

    adminUpdateProperty = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PROPERTY + id, data, config)
    };

    adminDeleteProperty = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_PROPERTY + id, config);
    }

    adminSelectPropertyCustomer = (propertyId, customerId) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        const url = `${BASE_URL_SERVER}${API_ENDPOINT.ADMIN_SELECT_PROPERTY_CUSTOMER}?propertyId=${propertyId}&customerID=${customerId}`;
        return axios.put(url, config);
    };


    getProjectCategoryDetailsID = (categoryDetailID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        console.log(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CATEGORY_DETAIL + categoryDetailID, config);
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CATEGORY_DETAIL + categoryDetailID, config);
    }

    getPropertyNotForSaleByCategory = (categoryDetailID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        console.log(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CATEGORY_DETAIL + categoryDetailID, config);
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CATEGORY_DETAIL + categoryDetailID, config);
    }
}

const propertyService = new PropertyService();
export default propertyService;

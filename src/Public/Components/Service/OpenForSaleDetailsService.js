import axios from 'axios';
import { BASE_URL_SERVER } from '../config/server';

const API_ENDPOINT = {
    ADMIN_LIST_OPENFORSALEDETAILS: "/api/open-for-sale-details",
    ADMIN_DETAIL_OPENFORSALEDETAIL: "/api/open-for-sale-details/",
    ADMIN_POST_OPENFORSALEDETAILS: "/api/open-for-sale-details",
    ADMIN_UPDATE_OPENFORSALEDETAILS: "/api/open-for-sale-details/",
    ADMIN_DELETE_OPENFORSALEDETAILS: "/api/open-for-sale-details/",
    ADMIN_GET_BY_OPENFORSALEID: "/api/open-for-sale-details/open-for-sale/" 
};

class OpenSaleDetailsService {
    adminListOpenSaleDetails = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_OPENFORSALEDETAILS, config);
    };

    adminDetailsOpenSaleDetail = (propertyID, openingForSaleID, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(
            `${BASE_URL_SERVER}/api/open-for-sale-details/${propertyID}/${openingForSaleID}`, 
            data, 
            config
        );
    };
    adminCreateOpenSaleDetail = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json', 
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_OPENFORSALEDETAILS, data, config);
    };

    adminUpdateOpenSaleDetail = (propertyID, openingForSaleID, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(
            `${BASE_URL_SERVER}/api/open-for-sale-details/${propertyID}/${openingForSaleID}`, 
            data, 
            config
        );
    };

    adminDeleteOpenSaleDetail = (propertyID, openingForSaleID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + `/api/open-for-sale-details/${propertyID}/${openingForSaleID}`, config);
    };
    

 
    getOpenForSaleDetailsByOpenForSaleID = (openingForSaleID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_GET_BY_OPENFORSALEID + openingForSaleID, config);
    };
}

const openSaleDetailsService = new OpenSaleDetailsService();
export default openSaleDetailsService;
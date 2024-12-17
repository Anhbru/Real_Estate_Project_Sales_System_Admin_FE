import axiosInstance from './axiosInstance';

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
        return axiosInstance.get(API_ENDPOINT.ADMIN_LIST_OPENFORSALEDETAILS);
    };

    adminDetailsOpenSaleDetail = (propertyID, openingForSaleID) => {
        return axiosInstance.get(
            `${API_ENDPOINT.ADMIN_DETAIL_OPENFORSALEDETAIL}${propertyID}/${openingForSaleID}`
        );
    };

    adminCreateOpenSaleDetail = (data) => {
        return axiosInstance.post(API_ENDPOINT.ADMIN_POST_OPENFORSALEDETAILS, data);
    };

    adminUpdateOpenSaleDetail = (propertyID, openingForSaleID, data) => {
        return axiosInstance.put(
            `${API_ENDPOINT.ADMIN_UPDATE_OPENFORSALEDETAILS}${propertyID}/${openingForSaleID}`, 
            data
        );
    };

    adminDeleteOpenSaleDetail = (propertyID, openingForSaleID) => {
        return axiosInstance.delete(
            `${API_ENDPOINT.ADMIN_DELETE_OPENFORSALEDETAILS}${propertyID}/${openingForSaleID}`
        );
    };

    getOpenForSaleDetailsByOpenForSaleID = (openingForSaleID) => {
        return axiosInstance.get(
            `${API_ENDPOINT.ADMIN_GET_BY_OPENFORSALEID}${openingForSaleID}`
        );
    };
}

const openSaleDetailsService = new OpenSaleDetailsService();
export default openSaleDetailsService;

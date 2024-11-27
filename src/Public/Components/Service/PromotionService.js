import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PROMOTIONS: "/api/promotions",
    ADMIN_DETAIL_PROMOTION: "/api/promotions/",
    ADMIN_POST_PROMOTION: "/api/promotions",
    ADMIN_UPDATE_PROMOTION: "/api/promotions/",
    ADMIN_DELETE_PROMOTION: "/api/promotions/",
};

class PromotionService {
    // ADMIN
    adminListPromotions = () => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PROMOTIONS,
            config
        );
    };

    adminDetailPromotion = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROMOTION + id,
            config
        );
    };

    adminCreatePromotion = (data) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_PROMOTION,
            data,
            config
        );
    };

    adminUpdatePromotion = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PROMOTION + id,
            data,
            config
        );
    };

    adminDeletePromotion = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_PROMOTION + id,
            config
        );
    };
}

const promotionService = new PromotionService();
export default promotionService;

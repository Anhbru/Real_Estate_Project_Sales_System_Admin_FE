import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenJson} from "../../Contants/Contatns"

const API_ENDPOINT = {
    ADMIN_SEND_IOS: "/api/notifications/send-ios/",
    ADMIN_LIST_NOTIFICATION: "/api/notifications",
    ADMIN_DETAIL_NOTIFICATION: "/api/notifications/",
    ADMIN_POST_NOTIFICATION: "/api/notifications",
    ADMIN_UPDATE_NOTIFICATION: "/api/notifications/",
    ADMIN_DELETE_NOTIFICATION: "/api/notifications/",
};

class NotificationService {
    sendIos = (id, data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_SEND_IOS + id, data,configTokenJson);
    };
    adminListNotification = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_NOTIFICATION, config);
    }

    adminDetailNotification = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_NOTIFICATION + id, config);
    }

    adminCreateNotification = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_NOTIFICATION, data, config);
    };

    adminUpdateNotification = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_NOTIFICATION + id, data, config)
    };

    adminDeleteNotification = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_NOTIFICATION + id, config);
    }
}

const notificationService = new NotificationService();
export default notificationService;

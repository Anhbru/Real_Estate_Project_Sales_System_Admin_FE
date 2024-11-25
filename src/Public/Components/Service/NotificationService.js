import axios from "axios";
import {BASE_URL_SERVER} from "../config/server";
import {configTokenJson} from "../../Contants/Contatns"

const API_ENDPOINT = {
    ADMIN_SEND_IOS: "/api/notifications/send-ios/",
};

class NotificationService {
    sendIos = (id, data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_SEND_IOS + id, data,configTokenJson);
    };
}

const notificationService = new NotificationService();
export default notificationService;

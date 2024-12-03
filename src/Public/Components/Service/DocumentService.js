import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_DOCUMENT: "/api/document-templates",
    ADMIN_DETAIL_DOCUMENT: "/api/document-templates/",
    ADMIN_POST_DOCUMENT: "/api/document-templates",
    ADMIN_UPDATE_DOCUMENT: "/api/document-templates/",
    ADMIN_DELETE_DOCUMENT: "/api/document-templates/",
    ADMIN_DETAIL_DOCUMENT_FILE: "/api/document-templates/file/",
}

class DocumentService {
    // ADMIN
    adminListDocument = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_DOCUMENT, config);
    }

    adminDetailDocument = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_DOCUMENT + id, config);
    }

    adminDetailDocumentFile = (id) => {
        const config = {
            headers: {
                'content-type': 'text/plain',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_DOCUMENT_FILE + id, config);
    }

    adminCreateDocument = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_DOCUMENT, data, config);
    };

    adminUpdateDocument = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_DOCUMENT + id, data, config);
    };

    adminDeleteDocument = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_DOCUMENT + id, config);
    }
}

const documentService = new DocumentService();

export default documentService;

import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PROJECT: "/api/projects",
    ADMIN_DETAIL_PROJECT: "/api/projects/",
    ADMIN_POST_PROJECT: "/api/projects",
    ADMIN_UPDATE_PROJECT: "/api/projects/",
    ADMIN_DELETE_PROJECT: "/api/projects/",
}

class ProjectService {
    // ADMIN
    adminListProject = (page) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PROJECT + '?page=' + page, config);
    }

    adminDetailProject = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROJECT + id, config);
    }

    adminCreateProject = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_PROJECT, data, config);
    };

    adminUpdateProject = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PROJECT + id, data, config)
    };

    adminDeleteProject = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_PROJECT + id, config);
    }
}

const projectService = new ProjectService();
export default projectService;
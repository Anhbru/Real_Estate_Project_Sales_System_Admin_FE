import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PROJECT_CATEGORY: "/api/project-category-details",
    ADMIN_DETAIL_PROJECT_CATEGORY: "/api/project-category-details/",
    ADMIN_POST_PROJECT_CATEGORY: "/api/project-category-details",
    ADMIN_UPDATE_PROJECT_CATEGORY: "/api/project-category-details/",
    ADMIN_DELETE_PROJECT_CATEGORY: "/api/project-category-details/",
}

class ProjectCategoryService {
    // ADMIN
    adminListProjectCategory = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PROJECT_CATEGORY, config);
    }

    adminDetailProjectCategory = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROJECT_CATEGORY + id, config);
    }

    adminCreateProjectCategory = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_PROJECT_CATEGORY, data, config);
    };

    adminUpdateProjectCategory = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PROJECT_CATEGORY + id, data, config)
    };

    adminDeleteProjectCategory = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_PROJECT_CATEGORY + id, config);
    }
}

const projectCategoryService = new ProjectCategoryService();
export default projectCategoryService;

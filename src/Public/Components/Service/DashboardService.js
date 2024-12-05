import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    MONTHLY_TOTAL_PRICE: "/api/dashboards/mothlytotalprice",
    TOTAL_PRICE: "/api/dashboards/totalprice",
    COUNT_PROPERTY: "/api/dashboards/countproperty",
    COUNT_CUSTOMER: "/api/dashboards/countcustomer",
    OUTSTANDING_AMOUNT: "/api/dashboards/outstandingamount",
}

class DashboardService {
    // ADMIN
    getMonthlyTotalPrice = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.MONTHLY_TOTAL_PRICE, config);
    }

    getTotalPrice = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.TOTAL_PRICE, config);
    }

    getCountProperty = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.COUNT_PROPERTY, config);
    }

    getCountCustomer = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.COUNT_CUSTOMER, config);
    }

    getOutstandingAmount = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.OUTSTANDING_AMOUNT, config);
    }
}

const dashboardService = new DashboardService();

export default dashboardService;

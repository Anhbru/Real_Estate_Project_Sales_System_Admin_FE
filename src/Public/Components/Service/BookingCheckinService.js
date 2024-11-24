import axios from 'axios';
import { BASE_URL_SERVER } from '../config/server';

const API_ENDPOINT = {
    ADMIN_LIST_BOOKINGS: "/api/bookings/",
    ADMIN_DETAIL_BOOKING: "/api/bookings/",
    ADMIN_POST_BOOKING: "/api/bookings/",
    ADMIN_UPDATE_BOOKING: "/api/bookings/",
    ADMIN_DELETE_BOOKING: "/api/bookings/",
    ADMIN_LIST_BOOKINGS_BY_OPEN_FOR_SALE: "/api/bookings/open-for-sale/",
    ADMIN_CHECK_IN_BOOKING: "/api/bookings/",
};

class BookingCheckinService {
    
    adminListBookings = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_BOOKINGS, config);
    };

   
    adminListBookingsByOpeningForSaleID = (openingForSaleID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_BOOKINGS_BY_OPEN_FOR_SALE + openingForSaleID, config);
    };

    
    adminDetailBooking = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_BOOKING + id, config);
    };

    adminCreateBooking = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_BOOKING, data, config);
    };

    
    adminUpdateBooking = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_BOOKING + id, data, config);
    };

    
    adminDeleteBooking = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_BOOKING + id, config);
    };

    
    adminCheckInBooking = (id, data = null) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CHECK_IN_BOOKING + id + "/check-in", data, config); 
    };
}

const bookingCheckinService = new BookingCheckinService();
export default bookingCheckinService;

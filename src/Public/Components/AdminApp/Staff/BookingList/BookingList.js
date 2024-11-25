import React, { useEffect, useState } from 'react';
import bookingService from '../../../Service/BookingCheckinService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function BookingList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    
    const handleCheckIn = (bookingId, customerId) => {
        bookingService.adminCheckInBooking(bookingId, customerId)
            .then(response => {
                console.log("Check-in thành công:", response.data);
                
             
                getListBookings();
            })
            .catch(err => {
                console.error("Lỗi khi check-in:", err);
            });
    };

    
    const getListBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await bookingService.adminListBookings();
            console.log("Bookings Response:", res.data);
            if (res.status === 200) {
                
                const sortedData = res.data
                    .filter(item => item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) 
                    .sort((a, b) => {
                        if (a.projectName === b.projectName) {
                            
                            return new Date(b.depositedTimed) - new Date(a.depositedTimed);
                        }
                        return a.projectName.localeCompare(b.projectName); 
                    });
                setData(sortedData);
            } else {
                setError("Failed to fetch bookings.");
            }
        } catch (err) {
            setError("Error fetching bookings: " + err.message);
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

   
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const checkAll = () => {
        if ($('#checkAll').is(":checked")) {
            $('.checkbox_item_').prop('checked', true);
        } else {
            $('.checkbox_item_').prop('checked', false);
        }
    };

    useEffect(() => {
        getListBookings();
    }, [searchTerm]); 

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Booking List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search by Project Name"
                            value={searchTerm} 
                            onChange={handleSearchChange} 
                        />
                        <a href="/staff/propertylist" className="btn_go_">
                            Chọn Căn <img src="/assets/icon/plus_icon.png" alt="" />
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <>
                                {data.length === 0 ? (
                                    <p>No bookings found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="5%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Booking Price</th>
                                                <th scope="col">Booking Status</th>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Deposit Time</th>
                                                <th scope="col">Property Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.bookingID}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.customerName}</td>
                                                    <td>{item.depositedTimed ? new Date(item.depositedTimed).toLocaleString() : 'N/A'}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.projectName}</td>
                                                    <td>{new Date(item.depositedTimed).toLocaleString()}</td>
                                                    <td>{item.propertyCategoryName}</td>
                                                    <td>
                                                        <p className="nav-item dropdown">
                                                            <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                                role="button" aria-expanded="false">
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href={'/staff/detailcheckin/' + item.openingForSaleID}>Danh sách checkin</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                
                                                                
                                                                {item.status !== 'Checked-in' && (
                                                                    <li><button className="dropdown-item" onClick={() => handleCheckIn(item.bookingID, item.customerID)}>Check-in</button></li>
                                                                )}
                                                            </ul>
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default BookingList;

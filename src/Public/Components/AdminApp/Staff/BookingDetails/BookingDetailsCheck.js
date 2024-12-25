import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookingService from '../../../Service/BookingCheckinService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import QrScanner from 'react-qr-scanner';

function BookingList() {
    const { openingForSaleID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [bookingIDInput, setBookingIDInput] = useState('');
    const [showQRScanner, setShowQRScanner] = useState(false);

    const getListBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!openingForSaleID) {
                setError("No opening sale ID provided.");
                setLoading(false);
                return;
            }

            let res = await bookingService.adminListBookingsByOpeningForSaleID(openingForSaleID);

            if (res.status === 200) {
                const filteredBookings = res.data.filter(item => item.status === 'Đã check in');

                const searchedBookings = filteredBookings.filter(item =>
                    item.decisionName.toLowerCase().includes(searchTerm.toLowerCase())
                );

                const sortedBookings = searchedBookings.sort((a, b) => {
                    if (a.decisionName === b.decisionName) {
                        return new Date(b.depositedTimed) - new Date(a.depositedTimed);
                    } else {
                        return a.decisionName.localeCompare(b.decisionName);
                    }
                });

                setData(Array.isArray(sortedBookings) ? sortedBookings : []);
            } else {
                setError("Failed to fetch bookings.");
            }
        } catch (err) {
            setError("Error fetching bookings: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        const bookingID = bookingIDInput.trim();
        if (!bookingID) {
            setErrorMessage('Vui lòng nhập bookingID.');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const res = await bookingService.adminCheckInBooking(bookingID);
            if (res.status === 200) {
                setSuccessMessage('Check-in thành công!');
                getListBookings();
            } else {
                setErrorMessage('Lỗi khi check-in.');
            }
        } catch (err) {
            setErrorMessage('Lỗi khi check-in: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleScan = async (data) => {
        if (data && data.text) {
            try {
                const qrData = JSON.parse(data.text); 
                if (qrData.bookingID) {
                    const bookingID = qrData.bookingID;
    
                    setLoading(true);
                    setErrorMessage('');
                    setSuccessMessage('');
                    try {
                        const resDetail = await bookingService.adminDetailBooking(bookingID); 
                        if (resDetail.status === 200 && resDetail.data) {
                            const booking = resDetail.data;
                            if (booking.status === "Chưa thanh toán tiền giữ chỗ") {
                                setErrorMessage("Booking chưa thanh toán tiền giữ chỗ.");
                            } else {
                                const resCheckIn = await bookingService.adminCheckInBooking(bookingID); 
                                if (resCheckIn.status === 200) {
                                    setSuccessMessage("Quét mã QR và check-in thành công!");
                                    getListBookings(); // Refresh danh sách booking
                                } else {
                                    setErrorMessage("Lỗi khi check-in.");
                                }
                            }
                        } else {
                            setErrorMessage("Không tìm thấy thông tin booking.");
                        }
                    } catch (err) {
                        setErrorMessage("Lỗi khi xử lý mã QR: " + err.message);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setErrorMessage('Dữ liệu mã QR không hợp lệ.');
                }
            } catch (error) {
                setErrorMessage('Lỗi phân tích mã QR. Vui lòng thử lại.');
            }
            setShowQRScanner(false); // Đóng scanner sau khi xử lý
        }
    };
    
    


    const handleError = (err) => {
        console.error(err);
        setErrorMessage('Lỗi khi quét mã QR.');
    };

    const navigate = useNavigate();

    const handleSelectProperty = (projectCategoryDetailID, customerID) => {
        navigate(`/staff/propertylist/${projectCategoryDetailID}`, { state: { customerID } });
    };

    useEffect(() => {
        getListBookings();
    }, [searchTerm, openingForSaleID]);

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
                            placeholder="Search by decision name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button className="btn btn-secondary" onClick={() => setShowQRScanner(!showQRScanner)}>
                            Quét mã QR
                        </button>
                    </div>

                    {showQRScanner && (
                        <div className="qr-scanner">
                            <QrScanner
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}

                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Booking Price</th>
                                                <th scope="col">Booking Status</th>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Decision Name</th>
                                                <th scope="col">Deposit Time</th>
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
                                                    <td>{item.decisionName}</td>
                                                    <td>{new Date(item.depositedTimed).toLocaleString()}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleSelectProperty(item.projectCategoryDetailID, item.customerID)}
                                                            className="btn btn-primary"
                                                        >
                                                            Chọn Căn
                                                        </button>
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

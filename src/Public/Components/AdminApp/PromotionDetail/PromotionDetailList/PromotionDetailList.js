import React, {useEffect, useState} from "react";
import promotionDetailService from "../../../Service/PromotionDetailService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Pagination from "../../../Shared/Admin/Utils/Pagination";
import {useParams, useSearchParams} from "react-router-dom";

function PromotionDetailList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams] = useSearchParams();

    let promotionID = searchParams.get('promotionID');

    const getListPromotionDetail = async (page) => {
        await promotionDetailService
            .getList(page)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const getListPromotionDetailById = async (promotionID) => {
        await promotionDetailService
            .getListByPromotionID(promotionID)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (event, id) => {
        if (!window.confirm('Are you want to delete?')){
            return;
        }

        event.preventDefault();

        await promotionDetailService.delete(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                     let message = res.data.message ?? 'Delete successfully!';
                    alert(message);
                    getListPromotionDetail();
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        if (!promotionID) {
            getListPromotionDetail();
        }
    }, [currentPage]);

    useEffect(() => {
        if (promotionID) {
            getListPromotionDetailById(promotionID);
        }
    }, [currentPage, loading, promotionID]);
    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Promotion Detail List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search zones name"
                        />

                        <a
                            href={
                                promotionID
                                    ? `/promotiondetails/create?promotionID=${promotionID}`
                                    : "/promotiondetails/create"
                            }
                            className="btn_go_"
                        >
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Promotion Name</th>
                                <th scope="col">Property Type Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.promotionName}</td>
                                        <td>{item.propertyTypeName}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <p className="nav-item dropdown">
                                                <a
                                                    className="nav-link"
                                                    data-bs-toggle="dropdown"
                                                    href="#"
                                                    role="button"
                                                    aria-expanded="false"
                                                >
                                                    <img src="/assets/icon/more_icon.png" alt=""/>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={"/promotiondetails/detail/" + item.promotionDetailID}
                                                        >
                                                            Detail promotion
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={
                                                                promotionID
                                                                    ? `/promotiondetails/update/` + item.promotionDetailID + `?promotionID=${promotionID}`
                                                                    : "/promotiondetails/update/" + item.promotionDetailID
                                                            }
                                                        >
                                                            Update promotion
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item"
                                                           onClick={event => handleDelete(event, item.promotionDetailID)}
                                                           href="#">
                                                            Delete promotion
                                                        </a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default PromotionDetailList;

import React, {useEffect, useState} from 'react';
import blockService from '../../../Service/BlockService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Pagination from "../../../Shared/Admin/Utils/Pagination";

function BlockList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getListBlock = async (page) => {
        await blockService.adminListBlock(page)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setData(res.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })

    }

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (event, id) => {
        event.preventDefault();

        await blockService.adminDeleteBlock(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                     let message = res.data.message ?? 'Delete successfully!';
                    alert(message);
                    getListBlock(currentPage);
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
        getListBlock(currentPage);
    }, [currentPage]);
    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Block List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search blocks name"/>

                        <a href="/blocks/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">BlockName</th>
                                <th scope="col">ZoneName</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.blockName}</td>
                                            <td>{item.zoneName}</td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png"
                                                        alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/blocks/detail/' + item.blockID}>Detail
                                                            blocks</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/blocks/update/' + item.blockID}>Update
                                                            blocks</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item"
                                                               onClick={event => handleDelete(event, item.blockID)}
                                                               href="#">Delete
                                                                blocks</a></li>
                                                    </ul>
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
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
    )
}

export default BlockList

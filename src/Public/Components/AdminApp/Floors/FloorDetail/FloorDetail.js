import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import floorService from '../../../Service/FloorService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function FloorDetail() {
    const [floor, setFloor] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();

    const detailFloor = async () => {
        await floorService.adminDetailFloor(id)
            .then((res) => {
                console.log("detail floor", res.data);
                setFloor(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        detailFloor();
    }, [form, id, loading])


    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/floors/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to floor list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>A01.01</h1>
                </div>
                {/* End Page Title */}
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">
                                    General information
                                </p>
                                <a href={"/floors/update/" + floor.floorID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    {/*<div className="d-flex align-items-center justify-content-start col-md-6">*/}
                                    {/*    <p className="key_">Floor Name: </p>*/}
                                    {/*    <p className="val_ text-truncate">{floor.floorName}</p>*/}
                                    {/*</div>*/}
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Block Name: </p>
                                        <p className="val_ text-truncate">{floor.blockName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-primary mt-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal">
                                                Xem hình ảnh
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Num Floor: </p>
                                        <p className="val_ text-truncate">{floor.numFloor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Hình ảnh</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="row">
                                    <img src={floor.imageFloor} alt=""
                                         style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FloorDetail

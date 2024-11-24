import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import blockService from "../../../Service/BlockService";
import floorService from "../../../Service/FloorService";

function FloorUpdate() {
    const [floor, setFloor] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [blocks, setBlocks] = useState([]);

    const getListBlock = async () => {
        await blockService.adminListBlock()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setBlocks(res.data)
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

    const createFloor = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang chỉnh sửa...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await floorService.adminUpdateFloor(id, formData)
            .then((res) => {
                console.log("create block", res.data)
                message.success("chỉnh sửa floors thành công!")
                navigate("/floors/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
            })
    }

    const detailFloor = async () => {
        await floorService.adminDetailFloor(id)
            .then((res) => {
                console.log("detail Floor", res.data);
                setFloor(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getListBlock();
        detailFloor();
    }, [form, id, loading])

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/floors/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                    </Link>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createFloor}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="FloorName">Floor Name</label>
                                            <input type="text" className="form-control" name="FloorName"
                                                   id="FloorName" defaultValue={floor.floorName}
                                                   placeholder="Enter your Floor Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ImageFloor">Image Floor</label>
                                            <input type="file" className="form-control" name="ImageFloor"
                                                   id="ImageFloor" placeholder="Enter yourImageFloor"/>
                                            <div className="col-md-3">
                                                <button type="button" className="btn btn-primary mt-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal">
                                                    Xem hình ảnh
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BlockID">BlockID</label>
                                            <select name="BlockID" id="BlockID" className="form-control">
                                                {
                                                    blocks.map((block) => {
                                                        return (
                                                            <option key={block.blockID}
                                                                    value={block.blockID}>
                                                                {block.blockName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="NumFloor">NumFloor</label>
                                            <input type="number" className="form-control" name="NumFloor"
                                                   defaultValue={floor.numFloor}
                                                   id="NumFloor" placeholder="Enter NumFloor"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
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

export default FloorUpdate

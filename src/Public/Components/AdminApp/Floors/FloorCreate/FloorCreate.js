import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import blockService from "../../../Service/BlockService";
import floorService from "../../../Service/FloorService";
import BackButton from '../../../../Utils/BackButton';
import AlertMessageError from '../../../../Utils/AlertMessageError';

function FloorCreate() {
    const [blocks, setBlocks] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await floorService.adminCreateFloor(formData)
            .then((res) => {
                console.log("create floor", res.data)
                message.success("Tạo floor thành công!")
                navigate("/floors/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                AlertMessageError(err);
            })
    }

    useEffect(() => {
        getListBlock();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/Floors/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to floor list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Floor</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createFloor}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    {/*<div className="col-md-5">*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <label htmlFor="FloorName">Floor Name</label>*/}
                                    {/*        <input type="text" className="form-control" name="FloorName"*/}
                                    {/*               id="FloorName"*/}
                                    {/*               placeholder="Enter your Floor Name"/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ImageFloor">Image Floor</label>
                                            <input type="file" className="form-control" name="ImageFloor"
                                                   id="ImageFloor" placeholder="Enter yourImageFloor"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BlockID">Block Name</label>
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
                                                   id="NumFloor" placeholder="Enter NumFloor"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                   <BackButton />
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default FloorCreate

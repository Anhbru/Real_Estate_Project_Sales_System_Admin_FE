import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import blockService from "../../../Service/BlockService";
import zoneService from "../../../Service/ZoneService";

function BlockCreate() {
    const [zones, setZones] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getListZone = async () => {
        await zoneService.adminListZone()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setZones(res.data)
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

    const createBlock = async () => {
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

        await blockService.adminCreateBlock(formData)
            .then((res) => {
                console.log("create property", res.data)
                message.success("Tạo biến thể thành công!")
                navigate("/blocks/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            })
    }

    useEffect(() => {
        getListZone();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/blocks/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to block list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Blocks</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createBlock}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BlockName">Block Name</label>
                                            <input type="text" className="form-control" name="BlockName"
                                                   id="BlockName"
                                                   placeholder="Enter your Block Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ImageBlock">Image Block</label>
                                            <input type="file" className="form-control" name="ImageBlock"
                                                   id="ImageBlock" placeholder="Enter yourImageBlock"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="zoneID">Zone</label>
                                            <select name="zoneID" id="zoneID" className="form-control">
                                                {
                                                    zones.map((zone) => {
                                                        return (
                                                            <option key={zone.zoneID}
                                                                    value={zone.zoneID}>
                                                                {zone.zoneName} - {zone.projectName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    {/*<div className="col-md-5">*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <label htmlFor="Status">Status</label>*/}
                                    {/*        <input type="text" className="form-control" name="Status"*/}
                                    {/*               id="Status" placeholder="Enter Status"/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
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
        </>
    )
}

export default BlockCreate

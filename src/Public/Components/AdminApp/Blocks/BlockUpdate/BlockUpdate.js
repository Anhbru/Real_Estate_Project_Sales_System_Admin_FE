import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import blockService from "../../../Service/BlockService";
import zoneService from "../../../Service/ZoneService";
import BackButton from '../../../../Utils/BackButton';
import AlertMessageError from "../../../../Utils/AlertMessageError";

function BlockUpdate() {
    const [zones, setZones] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [block, setBlock] = useState([]);
    const [fileName, setFileName] = useState("default_image_name.jpg");

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

    const preUploadImage = (evt, imgInp) => {
        const imagePreview = document.getElementById('imagePreview')
        const [file] = imgInp.files
        if (file) {
            imagePreview.src = URL.createObjectURL(file)
            setFileName(file.name);
        }
    }

    const createBlock = async () => {
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

        await blockService.adminUpdateBlock(id, formData)
            .then((res) => {
                console.log("create block", res.data)
                message.success("chỉnh sửa block thành công!")
                navigate("/blocks/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                AlertMessageError(err);
            })
    }

    const detailBlock = async () => {
        await blockService.adminDetailBlock(id)
            .then((res) => {
                console.log("detail property", res.data);
                setBlock(res.data)
                setLoading(false)
                const lastPath = res.data.imageBlock.split('/').pop();
                setFileName(lastPath)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getListZone();
        detailBlock();
    }, [form, id, loading])

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
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createBlock}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-start form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BlockName">Block Name</label>
                                            <input type="text" className="form-control" name="BlockName"
                                                   id="BlockName" defaultValue={block.blockName}
                                                   placeholder="Enter your Block Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ImageBlock">Image Block</label>
                                            <label className="form-control" htmlFor="ImageBlock">{fileName}</label>
                                            <input type="file" className="form-control" name="ImageBlock"
                                                   onChange={event => preUploadImage(event, event.target)}
                                                   style={{display: 'none'}}
                                                   id="ImageBlock" placeholder="Enter yourImageBlock"/>
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
                                            <label htmlFor="ZoneID">Zone</label>
                                            <select name="ZoneID" id="ZoneID" className="form-control">
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

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Status">Status</label>
                                            <select name="Status" id="Status" className="form-control">
                                                <option value="true">ACTIVE</option>
                                                <option value="false">INACTIVE</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <BackButton/>
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
                                    <img src={block.imageBlock} alt="" id="imagePreview"
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

export default BlockUpdate

import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, message} from "antd";
import projectService from "../../../Service/ProjectService";
import propertyTypeService from "../../../Service/PropertyTypeService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import propertyService from "../../../Service/PropertyService";
import blockService from "../../../Service/BlockService";
import floorService from "../../../Service/FloorService";
import unitTypeService from "../../../Service/UnitTypeService";
import zoneService from "../../../Service/ZoneService";
import projectCategoryDetailService from "../../../Service/ProjectCategoryDetailService";

function PropertyCreate() {
    const [projects, setProjects] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [projectCategoryDetails, setProjectCategoryDetails] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [floors, setFloors] = useState([]);
    const [zones, setZones] = useState([]);
    const [unitTypes, setUnitTypes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const preUploadImage = () => {
        $("input#Image").click();
    };

    const getListProject = async () => {
        await projectService
            .getList()
            .then((res) => {
                if (res.status === 200) {
                    setProjects(res.data);
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

    const getListProjectCategoryDetails = async () => {
        await projectCategoryDetailService
            .getList()
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setProjectCategoryDetails(res.data);
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

    const getListBlock = async () => {
        await blockService
            .adminListBlock()
            .then((res) => {
                if (res.status === 200) {
                    setBlocks(res.data);
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

    const getListFloor = async () => {
        await floorService
            .adminListFloor()
            .then((res) => {
                if (res.status === 200) {
                    setFloors(res.data);
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

    const getListZone = async () => {
        await zoneService
            .adminListZone()
            .then((res) => {
                if (res.status === 200) {
                    setZones(res.data);
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

    const getListUnitType = async () => {
        await unitTypeService
            .adminListUnit()
            .then((res) => {
                if (res.status === 200) {
                    setUnitTypes(res.data);
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

    const getListPropertyType = async () => {
        await propertyTypeService
            .adminListProperty()
            .then((res) => {
                if (res.status === 200) {
                    setPropertyTypes(res.data);
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

    const getImage = () => {
        let src = $("input#Image").val();
        if (src) {
            let file_name = src.split("\\").pop();
            $("#content_image_").text(file_name);
        }
    };

    const createProperty = async () => {
        $("#btnCreate").prop("disabled", true).text("Đang tạo mới...");

        let inputs = $(
            "#formCreate input, #formCreate textarea, #formCreate select"
        );
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + " không được bỏ trống!");
                $("#btnCreate").prop("disabled", false).text("Tạo mới");
                return;
            }
        }

        const formData = new FormData($("#formCreate")[0]);

        await propertyService
            .adminCreateProperty(formData)
            .then((res) => {
                console.log("create property", res.data);
                message.success("Tạo biến thể thành công!");
                navigate("/properties/list");
            })
            .catch((err) => {
                console.log(err);
                $("#btnCreate").prop("disabled", false).text("Tạo mới");
            });
    };

    useEffect(() => {
        getListProject();
        getListPropertyType();
        getListBlock();
        getListFloor();
        getListUnitType();
        getListZone();
        getListProjectCategoryDetails();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/properties/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to
                        property list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Property</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form
                            id="formCreate"
                            className="form_create_custom_"
                            onFinish={createProperty}
                        >
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="propertyCode">Property Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="propertyCode"
                                                id="propertyCode"
                                                placeholder="Enter your Property Code"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="priceSold">Price Sold</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="priceSold"
                                                id="priceSold"
                                                placeholder="Enter your Price Sold"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="view">View</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="view"
                                                id="view"
                                                placeholder="Enter your View"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="projectCategoryDetailID">Project Category Detail</label>
                                            <select
                                                name="projectCategoryDetailID"
                                                id="projectCategoryDetailID"
                                                className="form-control"
                                            >
                                                {projectCategoryDetails.map((item) => {
                                                    return (
                                                        <option
                                                            key={item.projectCategoryDetailID}
                                                            value={item.projectCategoryDetailID}
                                                        >
                                                            {item.propertyCategoryName} - {item.projectName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="unitTypeID">Unit Type</label>
                                            <select
                                                name="unitTypeID"
                                                id="unitTypeID"
                                                className="form-control"
                                            >
                                                {unitTypes.map((unitType) => {
                                                    return (
                                                        <option
                                                            key={unitType.unitTypeID}
                                                            value={unitType.unitTypeID}
                                                        >
                                                            {unitType.propertyTypeName} - {unitType.netFloorArea} - {unitType.grossFloorArea}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="blockID">Block</label>
                                            <select
                                                name="blockID"
                                                id="blockID"
                                                className="form-control"
                                            >
                                                {blocks.map((block) => {
                                                    return (
                                                        <option key={block.blockID} value={block.blockID}>
                                                            {block.blockName}-{block.zoneName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="zoneID">Zone</label>
                                            <select
                                                name="zoneID"
                                                id="zoneID"
                                                className="form-control"
                                            >
                                                {zones.map((zone) => {
                                                    return (
                                                        <option key={zone.zoneID} value={zone.zoneID}>
                                                            {zone.zoneName}-{zone.projectName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="floorID">Floor</label>
                                            <select
                                                name="floorID"
                                                id="floorID"
                                                className="form-control"
                                            >
                                                {floors.map((floor) => {
                                                    return (
                                                        <option key={floor.floorID} value={floor.floorID}>
                                                            {floor.numFloor}-{floor.blockName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="d-flex justify-content-between align-items-center form_el mt-3">*/}
                                {/*    <div className="col-md-5">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <label htmlFor="PropertyTypeID">PropertyType</label>*/}
                                {/*            <select*/}
                                {/*                name="PropertyTypeID"*/}
                                {/*                id="PropertyTypeID"*/}
                                {/*                className="form-control"*/}
                                {/*            >*/}
                                {/*                {propertyTypes.map((propertyType) => {*/}
                                {/*                    return (*/}
                                {/*                        <option*/}
                                {/*                            key={propertyType.propertyTypeID}*/}
                                {/*                            value={propertyType.propertyTypeID}*/}
                                {/*                        >*/}
                                {/*                            {propertyType.propertyTypeName}*/}
                                {/*                        </option>*/}
                                {/*                    );*/}
                                {/*                })}*/}
                                {/*            </select>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md-5">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <label htmlFor="ProjectID">Project</label>*/}
                                {/*            <select*/}
                                {/*                name="ProjectID"*/}
                                {/*                id="ProjectID"*/}
                                {/*                className="form-control"*/}
                                {/*            >*/}
                                {/*                {projects.map((project) => {*/}
                                {/*                    return (*/}
                                {/*                        <option*/}
                                {/*                            key={project.projectID}*/}
                                {/*                            value={project.projectID}*/}
                                {/*                        >*/}
                                {/*                            {project.projectName}*/}
                                {/*                        </option>*/}
                                {/*                    );*/}
                                {/*                })}*/}
                                {/*            </select>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="d-flex justify-content-between align-items-center form_el mt-3">*/}
                                {/*    <div className="col-md-5">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <label htmlFor="Image">Image: <button className="btn_upload_"*/}
                                {/*                                                  onClick={preUploadImage}*/}
                                {/*                                                  type="button">Choose Image</button>*/}
                                {/*                <span id="content_image_">No Image Chosen</span>*/}
                                {/*            </label>*/}
                                {/*            <input type="file" onChange={getImage} className="d-none" name="Image"*/}
                                {/*                   id="Image"*/}
                                {/*                   placeholder=""/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">
                                    Back
                                </button>
                                <button id="btnCreate" className="btn_create" type="submit">
                                    Save
                                </button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default PropertyCreate;
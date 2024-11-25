import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import zoneService from "../../../Service/ZoneService";
import projectService from "../../../Service/ProjectService";

function ZoneCreate() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getListProject = async () => {
    await projectService
      .adminListProject(1)
      .then((res) => {
        if (res.status === 200) {
          setProjects(res.data.projects);
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

  const createZone = async () => {
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

    await zoneService
      .adminCreateZone(formData)
      .then((res) => {
        console.log("create zone", res.data);
        message.success("Tạo zone thành công!");
        navigate("/zones/list");
      })
      .catch((err) => {
        console.log(err);
        $("#btnCreate").prop("disabled", false).text("Tạo mới");
      });
  };

  useEffect(() => {
    getListProject();
  }, [loading]);

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="back_to_page_">
          <Link to="/zones/list" className="back__url_">
            <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to zone
            list
          </Link>
        </div>
        <div className="pagetitle">
          <h1>Add New Zone</h1>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="content_page_">
            <Form
              id="formCreate"
              className="form_create_custom_"
              onFinish={createZone}
            >
              <div className="form_area_">
                <div className="title_form_">General Information</div>

                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor="ZoneName">Zone Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ZoneName"
                        id="ZoneName"
                        placeholder="Enter your Zone Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor="ImageZone">Image Zone</label>
                      <input
                        type="file"
                        className="form-control"
                        name="ImageZone"
                        id="ImageZone"
                        placeholder="Enter yourImageZone"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor="ProjectID">ProjectID</label>
                      <select
                        name="ProjectID"
                        id="ProjectID"
                        className="form-control"
                      >
                        {projects.map((project) => {
                          return (
                            <option
                              key={project.projectID}
                              value={project.projectID}
                            >
                              {project.projectName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
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

export default ZoneCreate;

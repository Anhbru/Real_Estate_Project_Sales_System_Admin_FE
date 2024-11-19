import React, { useEffect, useState } from "react";
import Sidebar from "../../Shared/Admin/Sidebar/Sidebar";
import Header from "../../Shared/Admin/Header/Header";
import ProjectCategoryTable from "./Components/Table/ProjectCategoryTable";
import { Box, Typography } from "@mui/material";
import ButtonJs from "../../../Utils/Button";
import AddIcon from "@mui/icons-material/Add";
import DialogJs from "../../../Utils/Dialog";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectJs from "../../../Utils/Select";
import projectService from "../../Service/ProjectService";
import propertyCategoryService from "../../Service/PropertyCategoryService";
import projectCategoryDetailService from "../../Service/ProjectCategoryDetailService";
import { toast } from "react-toastify";

function ProjectCategoryDetail() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dataProject, setDataProject] = useState([]);
  const [dataProperty, setDataProperty] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const SchemaCreate = yup.object({
    projectID: yup.string().required("Vui lòng chọn dự án"),
    propertyCategoryID: yup.string().required("Vui lòng chọn danh mục"),
  });

  const defaultValues = {
    projectID: "",
    propertyCategoryID: "",
  };

  const methods = useForm({
    resolver: yupResolver(SchemaCreate),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const getListProjectDataTable = async () => {
    setLoading(true);
    await projectCategoryDetailService
      .getList()
      .then((res) => {
        setDataTable(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListProperty = async () => {
    await propertyCategoryService
      .getList()
      .then((res) => {
        const data = res.data?.map((item) => {
          return {
            id: item.propertyCategoryID,
            label: item.propertyCategoryName,
            value: item.propertyCategoryID,
          };
        });
        setDataProperty(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await projectService
      .getList()
      .then((res) => {
        const data = res.data?.map((item) => {
          return {
            id: item.projectID,
            label: item.projectName,
            value: item.projectID,
          };
        });
        setDataProject(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListProperty();
    getListProjectDataTable();
  }, []);

  const onSubmitForm = async (values) => {
    const data = {
      projectID: values.projectID,
      propertyCategoryID: values.propertyCategoryID,
    };
    await projectCategoryDetailService
      .create(data)
      .then(() => {
        setOpenDialog(false);
        getListProjectDataTable();
        toast.success("Thêm mới thành công!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Thêm mới thất bại!");
      });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8rem",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <Box
          style={{
            textAlign: "center",
            marginLeft: "16rem",
          }}
        >
          <Typography variant="h5">Project category detail</Typography>
        </Box>
        <ButtonJs
          title="Create"
          leftIcon
          icon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <ProjectCategoryTable
          data={dataTable}
          getListProjectDataTable={getListProjectDataTable}
          dataProject={dataProject}
          dataProperty={dataProperty}
          loading={loading}
        />
      </Box>

      <DialogJs
        dialogSubmit
        methos={methods}
        onSubmit={handleSubmit(onSubmitForm)}
        open={openDialog}
        title="Tạo mới chi tiết hạng mục dự án"
        footerAction
        submitButton
        closeButton
        content="dsadsa"
        closeText="close"
        submitText="submit"
        maxWidth="sm"
        fullWidth
        onClose={() => setOpenDialog(false)}
        loading={isSubmitting}
      >
        <Box sx={{ mt: 2 }}>
          <SelectJs
            register={register}
            errors={errors.projectID}
            label="Dự án"
            arrayValue={dataProject}
            name="projectID"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <SelectJs
            register={register}
            errors={errors.propertyCategoryID}
            label="Danh mục tài sản"
            arrayValue={dataProperty}
            name="propertyCategoryID"
          />
        </Box>
      </DialogJs>
    </>
  );
}

export default ProjectCategoryDetail;

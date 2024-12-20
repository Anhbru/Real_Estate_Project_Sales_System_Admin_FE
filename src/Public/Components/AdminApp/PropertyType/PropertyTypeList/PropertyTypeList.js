import React, { useEffect, useState } from 'react';
import propertyTypeService from '../../../Service/PropertyTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

const PropertyTypeList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getListPropertyTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await propertyTypeService.adminListProperty();
            if (res.status === 200) {
                setData(Array.isArray(res.data) ? res.data : []);
            } else {
                setError("Failed to fetch property types.");
            }
        } catch (err) {
            setError("Error fetching property types: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property type?")) {
            try {
                await propertyTypeService.adminDeleteProperty(id);
                setData(data.filter(item => item.propertyTypeID !== id)); // Remove deleted item from state
                alert("Property type deleted successfully.");
            } catch (err) {
                console.error("Failed to delete property type:", err);
                alert("Failed to delete property type.");
            }
        }
    };

    useEffect(() => {
        getListPropertyTypes();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Property Type List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search property types" />
                        <a href="/propertytype/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt="" />
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <>
                                {data.length === 0 ? (
                                    <p>No property types found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="5%" />
                                            <col width="x" />
                                            <col width="25%" />
                                            <col width="20%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Property Type Name</th>
                                                <th scope="col">Category Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.propertyTypeID}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.propertyTypeName}</td>
                                                    <td>{item.propertyCategoryName}</td>
                                                    <td>
                                                        <div className="nav-item dropdown">
                                                            <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                                role="button" aria-expanded="false">
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href={'/propertytype/detail/' + item.propertyTypeID}>Detail</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href={'/propertytype/update/' + item.propertyTypeID}>Update</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li>
                                                                    <button 
                                                                        className="dropdown-item text-danger" 
                                                                        onClick={() => handleDelete(item.propertyTypeID)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default PropertyTypeList;

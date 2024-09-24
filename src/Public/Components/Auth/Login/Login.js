import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Input} from 'antd';
import authService from '../../Service/AuthService';
import $ from 'jquery';
import Css from '../../Shared/Admin/Lib/StyleSheet';
import Script from '../../Shared/Admin/Lib/Script';

function Login() {
    const onFinish = async () => {
        let username = document.getElementById('yourUsername').value;
        let password = document.getElementById('yourPassword').value;

        $('#btnLogin').prop('disabled', true).text('Đang đăng nhập...');

        let data = {
            username: username,
            password: password
        }
        await authService.loginAccount(data)
            .then((res) => {
                sessionStorage.setItem("accessToken", res.data.token);
                sessionStorage.setItem("id", res.data.userId);
                sessionStorage.setItem("username", res.data.username);
                sessionStorage.setItem("role", res.data.userRole);
                alert(`Welcome ${res.data.username} !`);
                console.log(res.data.userRole);
                if (res.data.userRole === 'ADMIN') {
                    window.location.href = '/admin/dashboard';
                } else {
                    window.location.href = '/';
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                alert(`Login failed! ` + err.response.data.message);
                $('#btnLogin').prop('disabled', false).text('Đng nhập');
            })
    };

    return (
        <>
            <Css/>
            <main>
                <div className="container">
                    <section
                        className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div
                                    className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <a href="/" className="logo d-flex align-items-center w-auto">
                                            <img src="/assets/admin/img/logo.png" alt=""></img>
                                            <span className="d-none d-lg-block">HandBag Website</span>
                                        </a>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Đăng nhập vào tài khoản
                                                    của bạn</h5>
                                                <p className="text-center small">Nhập tên người dùng và mật khẩu của bạn
                                                    để
                                                    đăng nhập</p>
                                            </div>

                                            <Form className="row g-3 needs-validation" onFinish={onFinish}>
                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Tên đăng
                                                        nhập</label>
                                                    <input className="form-control" id="yourUsername"
                                                           type="text" placeholder="Enter your username" required/>
                                                    <div className="invalid-feedback">Vui lòng điền tên đăng nhập.
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Mật
                                                        khẩu</label>
                                                    <input required className="form-control" id="yourPassword"
                                                           type="password" placeholder="Enter your password"/>
                                                    <div className="invalid-feedback">Vui lòng nhập mật khẩu của bạn!
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-12 d-flex justify-content-between align-items-center">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               name="remember"
                                                               value="true" id="rememberMe"></input>
                                                        <label className="form-check-label" htmlFor="rememberMe">Ghi nhớ
                                                            đăng nhập</label>
                                                    </div>
                                                    <a href="/forgot-password">Quên mật khẩu?</a>
                                                </div>
                                                <div className="col-12">
                                                    <button id="btnLogin" className="btn btn-primary w-100"
                                                            type="submit">Đăng nhập
                                                    </button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Bạn chưa có tài khoản?
                                                        <a href="/register">Tạo tài khoản ngay</a>
                                                    </p>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>

                                    <div className="credits">
                                        Thiết kế bởi <Link to="#">HandBag Developer Team</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
            <Script/>
        </>
    )
}

export default Login

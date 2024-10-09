import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Input} from 'antd';
import authService from '../../Service/AuthService';
import $ from 'jquery';
import Css from '../../Shared/Admin/Lib/StyleSheet';
import Script from '../../Shared/Admin/Lib/Script';

function Login() {
    const onFinish = async () => {
        let login_request = document.getElementById('login_request').value;
        let password = document.getElementById('password').value;

        $('#btnLogin').prop('disabled', true).text('Logging...');

        let data = {
            emailOrPhone: login_request,
            password: password
        }
        await authService.loginAccount(data)
            .then((res) => {
                sessionStorage.setItem("accessToken", res.data.token);
                // sessionStorage.setItem("id", res.data.userId);
                // sessionStorage.setItem("username", res.data.username);
                // sessionStorage.setItem("role", res.data.userRole);
                // alert(`Welcome ${res.data.username} !`);
                window.location.href = '/dashboard';
            })
            .catch((err) => {
                console.log(err.response.data);
                alert(err.response.data.message);
                $('#btnLogin').prop('disabled', false).text('Sign in');
            })
    };

    function toggleIcon() {
        let class_ = 'bi-eye-slash-fill';

        let password = $('#password');
        if (password.attr('type') === 'password') {
            password.attr('type', 'text');
            $('#content_').text('Hide')
            $('#icon_hide_').removeClass(class_)
        } else {
            password.attr('type', 'password');
            $('#icon_hide_').addClass(class_)
            $('#content_').text('Show')
        }
    }

    function checkInput() {
        let is_valid = true;

        let username = $('#username').val();
        let password = $('#password').val();

        if (username === null || username === '') {
            is_valid = false;
        }

        if (password === null || password === '') {
            is_valid = false;
        }

        if (is_valid) {
            $('#btnLogin').removeClass('disabled').attr('type', 'submit')
        } else {
            $('#btnLogin').addClass('disabled').attr('type', 'button')
        }
    }

    return (
        <>
            <Css/>
            <main className="main_auth">
                <section className="row">
                    <div className="col-md-6">
                        <img src="/assets/img/bg-auth.png" alt="Background Image" className="image_bg"/>
                    </div>
                    <div className="login_content d-flex align-items-center justify-content-start col-md-6">
                        <Form className="login_form_" onFinish={onFinish}>
                            <div className="login_title_">
                                Sign in
                            </div>
                            <div className="form_group_">
                                <label className="label_input_" htmlFor="login_request">User name or email
                                    address</label>
                                <input type="text" className="form_input_" id="login_request" name="login_request"
                                       onInput={checkInput} placeholder="Nhập phone or email" required/>
                            </div>
                            <div className="form_group_">
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <label className="label_input_" htmlFor="password">Your password</label>
                                    <span className="hide_or_show_" onClick={toggleIcon}>
                                        <i id="icon_hide_" className="bi bi-eye-fill bi-eye-slash-fill me-2"></i>
                                        <span id="content_">Show</span>
                                    </span>
                                </div>
                                <input type="password" className="form_input_" id="password" name="password"
                                       onInput={checkInput} placeholder="Nhập password" required/>
                            </div>
                            <p className="d-flex align-items-center justify-content-end">
                                <a href="#" className="forgot_password">Forget your password</a>
                            </p>
                            <button id="btnLogin" className="btn_login disabled" type="submit">Sign in</button>
                            <div className="page_other">OR</div>
                            <a href="#" className="btn_login_google_">
                                <img src="/assets/img/icon_google.png" alt="icon logo google"/>Continue with Google
                            </a>
                            <div className="col-12">
                                <p className="dont_account_ mb-0">Don’t have an acount? <a href="#">Sign
                                    up</a></p>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
            <Script/>
        </>
    )
}

export default Login

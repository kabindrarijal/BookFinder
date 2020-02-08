import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

class NormalLoginForm extends Component {
    state = {
        error: null
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axios
                    .post('http://127.0.0.1:8000/rest-authlogin/', {
                        username: values.username,
                        password: values.password
                    })
                    .then(res => {
                        console.log(res.data);
                        const token = res.data.key;
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('username', values.username);
                        // checkAuthTimeOut(3600);
                        document.location = '/';
                    })
                    .catch(error => {
                        this.setState({
                            error: error
                        });
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = (
                <p>
                {this.state.error.message === 'Request failed with status code 400'
                        ? 'Invalid Credentials'
                        : this.state.error.message}
                </p>
        );
        }

        return (
            <div
        style={{
            display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
        }}
    >
    <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ width: '30%' }}
    >
        {errorMessage}
    <Form.Item>
        {getFieldDecorator('username', {
            rules: [
                { required: true, message: 'Please input your username!' }
            ]
        })(
        <Input
        prefix={
            <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
    }
        placeholder="Username"
            />
    )}
    </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
            rules: [
                { required: true, message: 'Please input your Password!' }
            ]
        })(
        <Input
        prefix={
            <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
    }
        type="password"
        placeholder="Password"
            />
    )}
    </Form.Item>
        <Form.Item>
        <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
            >
            Log in
            </Button>
        Or <a href="">register now!</a>
        </Form.Item>
        </Form>
        </div>
    );
    }
}

const Signin = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Signin;
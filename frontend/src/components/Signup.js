import React, { Component } from 'react';
import axios from 'axios';

import { Form, Input,Icon, Button } from 'antd';

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        error: null
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axios
                    .post('http://127.0.0.1:8000/rest-auth/registration', {
                        username: values.username,
                        email: values.email,
                        password1: values.password,
                        password2: values.confirm
                    })
                    .then(res => {
                        const token = res.data.key;
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('username', values.username);
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

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <p>{this.state.error.message}</p>;
        }

        return (
            <div
        style={{
            display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
        }}
    >

    <Form onSubmit={this.handleSubmit} style={{ width: '30%' }}>
        {errorMessage}
    <Form.Item>
                    {getFieldDecorator('username', {
            rules: [
                { required: true, message: 'Please input your username!' }
            ]
        })(
        <Input
        placeholder="Username"
            />
    )}
    </Form.Item>
        <Form.Item>
        {getFieldDecorator('email', {
            rules: [
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                },
                {
                    required: true,
                    message: 'Please input your E-mail!'
                }
            ]
        })(
        <Input
        placeholder="Email"
            />
    )}
    </Form.Item>
        <Form.Item hasFeedback>
        {getFieldDecorator('password', {
            rules: [
                {
                    required: true,
                    message: 'Please input your password!'
                },
                {
                    validator: this.validateToNextPassword
                }
            ]
        })(
        <Input.Password
        placeholder="Password"
            />
    )}
    </Form.Item>
        <Form.Item hasFeedback>
        {getFieldDecorator('confirm', {
            rules: [
                {
                    required: true,
                    message: 'Please confirm your password!'
                },
                {
                    validator: this.compareToFirstPassword
                }
            ]
        })(
        <Input.Password
        placeholder="confirm password"
        onBlur={this.handleConfirmBlur}
        />
    )}
    </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit">
            Sign up
            </Button>
            </Form.Item>
            </Form>
            </div>
    );
    }
}

const Signup = Form.create({ name: 'register' })(RegistrationForm);

export default Signup;
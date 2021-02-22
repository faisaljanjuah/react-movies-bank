import React from 'react';
import Joi from 'joi-browser';
import Form from './../components/modules/form';
// import FormField from '../components/modules/formField';

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        console.log('Form Submitted');
    }

    render() {
        return (
            <div className="loginForm">
                <form onSubmit={this.sendForm}>
                    {this.renderField('Username', 'username')}
                    {this.renderField('Password', 'password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;
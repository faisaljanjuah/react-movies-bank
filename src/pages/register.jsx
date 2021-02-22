import React from 'react';
import Joi from 'joi-browser';
import Form from './../components/modules/form';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
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
                    {this.renderField('Name', 'name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
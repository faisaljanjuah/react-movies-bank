import React, { Component } from 'react';
import Joi from 'joi-browser';
import FormField from './formField';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const schemaOptions = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, schemaOptions);
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    onChange = ({ currentTarget: field }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(field);
        if (errorMessage) errors[field.name] = errorMessage;
        else delete errors[field.name];
        const data = { ...this.state.data };
        data[field.name] = field.value;
        this.setState({ data, errors });
    }

    sendForm = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    }

    renderField(label, name, type = "text") {
        const { data, errors } = this.state;
        return <FormField label={label} className="field-input form-element" type={type} name={name} id={`field_${name}`} value={data[name]} onChange={this.onChange} error={errors[name]} />
    }

    renderButton(label) {
        return <button className="btn btn-wide btn-primary" type="submit" disabled={this.validate()}>{label}</button>
    }
}

export default Form;
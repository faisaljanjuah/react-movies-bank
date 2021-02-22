import React from 'react';
import Joi from 'joi-browser';
import Form from './../components/modules/form';
import GetGenres from './../components/modules/genres';
import FormField from '../components/modules/formField';

class AddMovie extends Form {
    state = {
        data: {
            title: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        errors: {}
    }

    schema = {
        title: Joi.string().required().label('Title'),
        numberInStock: Joi.number().required().min(1).max(99).label('Stock'),
        dailyRentalRate: Joi.number().required().min(1).max(10).label('Raring')
    }

    doSubmit = (e) => {
        console.log('Form Submitted', e);
    }
    render() {
        return (
            <div className="loginForm">
                <form onSubmit={this.sendForm}>
                    {this.renderField('Movie Title', 'title')}
                    <FormField label="Genre" type="select" name="genre" id="movieGenre" onChange={this.vOnChange} options={GetGenres('all')} />
                    {this.renderField('Stock', 'numberInStock', 'number')}
                    {this.renderField('Av. Rating', 'dailyRentalRate', 'number')}
                    {this.renderButton('Add Movie')}
                </form>
            </div>
        );
    }
}

export default AddMovie;
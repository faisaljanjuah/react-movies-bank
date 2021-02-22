import React from 'react';

// const FormField = ({ label, name, error, type, id, className, value, options, onChange, disabled, required }) => {
const FormField = ({ label, name, error, id, type, options, ...rest }) => {
    return (
        <div className="form-field">
            {
                type === 'submit'
                    ? <button type={type && type} id={id && id} name={name && name} {...rest}>{label && label}</button>
                    : <React.Fragment>
                        {label && <label htmlFor={id && id}>{label}</label>}
                        {
                            type === 'select'
                                ? <select id={id && id} name={name && name} {...rest}><option value="">--Select{label && ` ${label}`}--</option>{options && options.map((o, i) => o.value && <option key={i} value={o.value}>{o.name}</option>)}</select>
                                : type === 'textarea'
                                    ? <textarea id={id && id} name={name && name} {...rest}></textarea>
                                    : <input type={type && type} id={id && id} name={name && name} {...rest} />
                        }
                        {error && <div className="alert alert-danger">{error}</div>}
                    </React.Fragment>
            }
        </div>
    );
    // return (
    //     <div className="form-field">
    //         {label ? <label htmlFor={id ? id : null}>{label}</label> : null}
    //         {
    //             type === 'textarea'
    //                 ? <textarea disabled={disabled ? disabled : null} required={required ? required : null} id={id ? id : null} className={className ? className : null} name={name ? name : null} value={value ? value : ''} onChange={onChange}></textarea>
    //                 : type === 'submit'
    //                     ? <button disabled={disabled ? disabled : null} required={required ? required : null} type={type ? type : null} id={id ? id : null} className={className ? className : null} name={name ? name : null} >{value}</button>
    //                     : type === 'select'
    //                         ? <select disabled={disabled ? disabled : null} required={required ? required : null} id={id ? id : null} className={className ? className : null} name={name ? name : null} value={value ? value : ''} onChange={onChange}><option value="">--Select{label ? ` ${label}` : ''}--</option>{
    //                             options ? options.map((o, i) => o.value ? <option key={i} value={o.value}>{o.name}</option> : null) : ''}</select>
    //                         : <input disabled={disabled ? disabled : null} required={required ? required : null} type={type ? type : null} id={id ? id : null} className={className ? className : null} name={name ? name : null} value={value ? value : ''} onChange={onChange} />
    //         }
    //         {error && <div className="alert alert-danger">{error}</div>}
    //     </div>
    // );
}

export default FormField;
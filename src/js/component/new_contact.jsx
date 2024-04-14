import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import useFormValidation from '../hooks/useFormValidation';
import PhoneCode from "./phone_code.jsx";

const NewContact = () => {
    const { actions } = useContext(Context);
    const {
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        address,
        setAddress,
        isEmailValid,
        isPhoneValid,
        isValid,
        resetFields,
        wasValidated,
    } = useFormValidation();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) alert("Please provide either a phone number, email, or address.");
        else {
            actions.addContact(name, email, phone, address);
            resetFields();
        }
    };

    const handlePhoneChange = (event)  => {
        const input = event.target.value;
        const regex = /^[0-9\b]*$/;
        
        console.log(regex.test(input))

        if (regex.test(input)) setPhone(input);
    }

    return (
        <form className="col-sm-11 col-md-8 col-lg-6 needs-validation" onSubmit={handleSubmit} noValidate>
            <h1 className="text-center">Add a new contact</h1>

            <div className="mb-3">
                <label htmlFor="full-name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="full-name" placeholder="Enter Full Name" value={name} onChange={(e) => { setName(e.target.value); }} required/>
            </div>
            
            <label htmlFor="email" className="form-label">Email address</label>
            <div className="input-group mb-3">
                <input type="text" id="email" placeholder="Enter email" aria-describedby="basic-addon2" className={`form-control ${!isEmailValid && wasValidated && email != "" ? "is-invalid" : ""}`} value={email} onChange={(e) => { setEmail(e.target.value); }} />
                <span className="input-group-text" id="basic-addon2">@example.com</span>
                <div className="invalid-feedback">
                    Please enter a valid email.
                </div>
            </div>
            
            <div className="mb-3 row">
                <label htmlFor="phone-number" className="form-label">Phone Number</label>
                <div className="d-flex">
                    <PhoneCode phone={phone}></PhoneCode>
                    <input 
                        type="text" className={`form-control ${!isPhoneValid && wasValidated && phone != "" ? "is-invalid" : ""}`} 
                        id="phone-number" 
                        placeholder="Enter phone number" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                    />
                </div>
                {!isPhoneValid && wasValidated && phone !== "" && (
                    <div className="text-danger" style={{ fontSize: ".875rem"}}>
                        Please enter a valid phone number.
                    </div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => { setAddress(e.target.value); }} />
            </div>

            <button className="btn btn-primary w-100">Save</button>

            <Link to="/">
				<span>or get back to contacts</span>
			</Link>
        </form>
    )
}

export default NewContact;
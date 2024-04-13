import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import useFormValidation from '../hooks/useFormValidation';

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
        isValid,
    } = useFormValidation();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) alert("Please provide either a phone number, email, or address.");
        else {
            actions.addContact(name, email, phone, address);
        }
    };

    return (
        <form className="col-sm-11 col-md-8 col-lg-6 needs-validation" onSubmit={handleSubmit} noValidate>
            <h1 className="text-center">Add a new contact</h1>

            <div className="mb-3">
                <label htmlFor="full-name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="full-name" placeholder="Enter Full Name" value={name} onChange={(e) => { setName(e.target.value); }} required/>
            </div>
            
            <label htmlFor="email" className="form-label">Email address</label>
            <div className="input-group mb-3">
                <input type="text" id="email" placeholder="Enter email" aria-describedby="basic-addon2" className={`form-control ${!isEmailValid ? "is-invalid" : ""}`} value={email} onChange={(e) => { setEmail(e.target.value); }} />
                <span className="input-group-text" id="basic-addon2">@example.com</span>
                <div className="invalid-feedback">
                    Please enter a valid email.
                </div>
            </div>
            
            <div className="mb-3">
                <label htmlFor="phone-number" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="phone-number" placeholder="Enter phone number" value={phone} onChange={(e) => { setPhone(e.target.value); }} />
                <div className="invalid-feedback">
                    Please enter a valid phone number.
                </div>
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
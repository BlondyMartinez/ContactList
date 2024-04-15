import React from "react";
import "../../styles/new_contact.css";
import NewContact from "../component/contact_form.jsx"; 

export const ContactFormPage = () => (
    <div className="container">
        <div className="d-flex justify-content-center m-2">
            <NewContact />
        </div>
    </div>
);

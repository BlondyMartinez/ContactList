import React from "react";

const Contact = (props) => {
    return (
        <div className="card">
            <h6>{props.name}</h6>
            <p>{props.phone}</p>
            <p>{props.email}</p>
            <p>{props.address}</p>
        </div>
    )
}

export default Contact;
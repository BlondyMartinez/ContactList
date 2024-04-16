import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import DeleteConfirmation from "./delete_confirmation.jsx";

const Contact = (props) => {
    const { store } = useContext(Context);
    const [onHover, setOnHover] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div 
            className={`color-inner-shadow w-100 bg-white border border-1 rounded mb-3 ${props.index % 2 === 0 ? 'even' : 'odd'}`} 
            onMouseEnter={() => { setOnHover(true) }} 
            onMouseOver={() => { setOnHover(true) }} 
            onMouseLeave={() => { setOnHover(false) }}
        >
            <div className="d-flex align-items-center">   
                <div className="col-11 d-flex align-items-center">
                    <div className="col-4 d-flex align-items-center">
                        <Icon className="icon-color" style={{ fontSize: "8rem" }} icon="ph:user-circle-duotone" /> 
                        <h3>{props.name}</h3>
                    </div>

                    <div className="vertical-line"></div>

                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        <h5>Contact Info</h5>
                        <div className={`d-flex align-items-center justify-content-center ${props.phone === "" ? 'invisible' : ''}`}>
                            <Icon className="fs-6 me-1" icon="material-symbols:phone-android" />
                            <span>{props.phone}</span>
                        </div>
                        
                        <div className={`d-flex align-items-center justify-content-center ${props.email === "" ? 'invisible' : ''}`}>
                            <Icon className="fs-6 me-1" icon="mdi:email" />
                            <span>{props.email}</span>
                        </div>
                    </div>
                    
                    <div className="vertical-line"></div>

                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        <h5>Address</h5>
                        <div className={`${props.address === "" ? 'invisible' : ''} text-center p-2`}>
                            <span><Icon className="fs-6 me-1" icon="bi:house-fill" />{props.address}</span>
                        </div>
                    </div>
                </div>

                <div className="me-3 col-1">
                    { onHover &&
                        <Link to={"/contact_form"}>
                            <button className="btn p-1 btn-icon" onClick={() => { store.editing = true; store.currentID = props.id; }}>
                                <Icon className="fs-3 text-success" icon="material-symbols:edit-square-outline" />
                            </button>
                        </Link>
                    }
                    { onHover &&
                        <div>
                            <button className="btn p-1 btn-icon" onClick={handleShowModal}>
                                <Icon className="fs-3 text-danger" icon="material-symbols:delete-outline" />
                            </button>
                            <DeleteConfirmation onClose={handleCloseModal} id={props.id} name={props.name} show={showModal}></DeleteConfirmation>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Contact;
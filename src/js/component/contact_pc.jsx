import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Contact = (props) => {
    const { store, actions } = useContext(Context);
    const [onHover, setOnHover] = useState(false);

    return (
        <div 
            className={`color-inner-shadow w-100 bg-white border border-1 rounded mb-4 ${props.index % 2 === 0 ? 'even' : 'odd'}`} 
            onMouseEnter={() => { setOnHover(true) }} 
            onMouseOver={() => { setOnHover(true) }} 
            onMouseLeave={() => { setOnHover(false) }}
        >
            <div className="d-flex align-items-center justify-content-between">   
                <div className="d-flex align-items-center">
                    <Icon className="icon-color" style={{ fontSize: "8rem" }} icon="ph:user-circle-duotone" /> 
                    <h3>{props.name}</h3>
                </div>
                <div className="me-3">
                    { onHover &&
                        <Link to={"/contact_form"}>
                            <button className="btn p-1" onClick={() => { store.editing = true; store.currentID = props.id; }}>
                                <Icon className="fs-3 text-success" icon="material-symbols:edit-square-outline" />
                            </button>
                        </Link>
                    }
                    { onHover &&
                        <button className="btn p-1" onClick={() => { actions.deleteContact(props.id) }}>
                            <Icon className="fs-3 text-danger" icon="material-symbols:delete-outline" />
                        </button>
                    }
                </div>
            </div>
            
            <div className="d-flex m-3 mt-0">
                <div className={`col-4 d-flex align-items-center justify-content-center ${props.phone === "" ? 'invisible' : ''}`}>
                    <Icon className="fs-6 me-1" icon="material-symbols:phone-android" />
                    <span>{props.phone}</span>
                </div>
                
                <div className={`col-4 d-flex align-items-center justify-content-center ${props.email === "" ? 'invisible' : ''}`}>
                    <Icon className="fs-6 me-1" icon="mdi:email" />
                    <span>{props.email}</span>
                </div>
                
                <div className={`col-4 d-flex align-items-center justify-content-center ${props.address === "" ? 'invisible' : ''}`}>
                    <Icon className="fs-6 me-1" icon="bi:house-fill" />
                    <span>{props.address}</span>
                </div>
            </div>
        </div>
    )
}

export default Contact;
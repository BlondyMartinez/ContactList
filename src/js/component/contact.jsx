import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Contact = (props) => {
    const { store, actions } = useContext(Context);

    const [isOpen, setIsOpen] = useState(false);
    const [onHover, setOnHover] = useState(false);

    return (
        <div 
            className="w-100 bg-white border border-1 rounded" 
            onMouseEnter={() => { setOnHover(true) }} 
            onMouseOver={() => { setOnHover(true) }} 
            onMouseLeave={() => { setOnHover(false) }}
        >
            <div className="d-flex align-items-center justify-content-between">   
                <div className="d-flex align-items-center">
                    <Icon style={{ fontSize: "4rem" }} icon="ph:user-circle-duotone" /> 
                    <h5>{props.name}</h5>
                </div>
                <div>
                    { onHover &&
                        <Link to={"/contact_form"}>
                            <button className="btn p-1" onClick={() => { store.editing = true; store.currentID = props.id; }}>
                                <Icon className="fs-5 text-success" icon="material-symbols:edit-square-outline" />
                            </button>
                        </Link>
                    }
                    { onHover &&
                        <button className="btn p-1" onClick={() => { actions.deleteContact(props.id) }}>
                            <Icon className="fs-5 text-danger" icon="material-symbols:delete-outline" />
                        </button>
                    }
                    <button className="btn me-3 p-1" onClick={() => {setIsOpen(!isOpen)}}>
                        {isOpen 
                            ? <Icon className="fs-3" icon="material-symbols:arrow-drop-up" /> 
                            : <Icon className="fs-3" icon="material-symbols:arrow-drop-down" />
                        }
                    </button>
                </div>
            </div>

            {isOpen && 
                <div className="d-flex flex-column ms-3 mb-3">
                    {props.phone !== "" &&
                        <div className="d-flex align-items-center">
                            <Icon className="fs-6 me-1" icon="material-symbols:phone-android" />
                            <span>{props.phone}</span>
                        </div>
                    }
                    {props.email !== "" &&
                        <div className="d-flex align-items-center">
                            <Icon className="fs-6 me-1" icon="mdi:email" />
                            <span>{props.email}</span>
                        </div>
                    }
                    {props.address !== "" &&
                        <div className="d-flex align-items-center">
                            <Icon className="fs-6 me-1" icon="bi:house-fill" />
                            <span>{props.address}</span>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Contact;
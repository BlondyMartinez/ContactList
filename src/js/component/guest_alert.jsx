import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation } from 'react-router-dom';

const GuestAlert = () => {
    const { store } = useContext(Context);
    const location = useLocation();

    return (
        store.user.id === "guest" && (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className={`col-sm-11 col-md-8 ${location.pathname === "/" ? "col-lg-10" : "col-lg-6"}  m-2 mb-0`}>
                        <div className="alert alert-danger">
                            In guest mode, any contacts added will be temporary and will not persist when the page is refreshed or when the user switches to a different account.
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default GuestAlert;
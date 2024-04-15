import React, { useContext } from "react";
import { Context } from "../store/appContext";

const GuestAlert = () => {
    const { store } = useContext(Context);
    return (
        store.user.id === "guest" && (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className=" col-sm-11 col-md-8 col-lg-6 m-2 mb-0">
                        <div className="alert alert-danger">
                            While in guest mode, contacts will be lost when the site is refreshed or when the user is changed.
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default GuestAlert;
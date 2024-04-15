import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const UserList = () => {
    const { store, actions } = useContext(Context);
    const [selectedValue, setSelectedValue] = useState(`${store.user.slug}_${store.user.id ? store.user.id : ''}`);

    useEffect(() => {
        actions.loadUserList();
    }, []);

    useEffect(() => {
        setSelectedValue(`${store.user.slug}_${store.user.id}`);
    }, [store.user, store.users]);

    return (
        <div className="d-flex align-items-center justify-content-center g-1">
            <div className="col-auto fw-bold ps-2">Choose user:</div>
            <div className="col-auto">
                <select 
                    className="form-select" 
                    aria-label="User list" 
                    id="user-select"
                    value={selectedValue}
                    onChange={(e) => actions.getSelectedUser(e.target.value)}
                >
                    {store.users.map((user) => (
                        <option key={user.id} value={`${user.slug}_${user.id === "guest" ? 'guest' : user.id}`}>{user.slug}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default UserList;
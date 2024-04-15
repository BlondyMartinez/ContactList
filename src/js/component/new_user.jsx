import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const NewUser = () => {
    const { store, actions, setStore } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(null);

    const handleChange = (event) => {
        const username = event.target.value.trim();
        setUsername(username);
        validateUsername(username);
    };

    function validateUsername(username) {
        const isUsernameTaken = store.users.some(user => user.slug === username);
        setValidUsername(!isUsernameTaken && username.length > 0);
    }


    return (
        <div className="mt-2">
            { store.userCreated &&
                <div className="alert alert-success">
                    User created successfully.
                </div>
            }
            <div className="card">
                <button className="btn btn-success w-100" onClick={() => setIsOpen(!isOpen)}>New User</button>
                { isOpen &&
                    <div className="p-2">
                        <h2 className="text-center">Create user</h2>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={handleChange} required/>
                        </div>
                        {username != '' && 
                            <div className={`form-text ${validUsername ? "text-success" :  "text-danger"} mb-2`}>
                                {validUsername ? "Valid username" : "Username already exists"}
                            </div>
                        }
                        <button className="btn btn-success w-100" disabled={!validUsername} onClick={() => { if(validUsername) actions.createUser(username); }}>Save</button>
                    </div>
                }
            </div>
	    </div>
    );
};

export default NewUser;
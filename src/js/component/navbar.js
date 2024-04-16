import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { store } = useContext(Context);
    const [username, setUsername] = useState("");
	const [endsInS, setEndsInS] = useState(false);

	useEffect(() => {
        setUsername(store.user?.slug || "");
        setEndsInS(store.user?.slug?.toLowerCase().endsWith("s") || false);
    }, [store.user])


	return (
		<nav className="navbar navbar-dark bg-dark mb-2 sticky-top d-flex justify-content-center">
			<div className="col-sm-12 col-lg-8 col-md-10 d-flex justify-content-between align-items-center">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand m-2 fs-4">{`${username}${endsInS ? "'" : "'s"} Contact List`}</span>
				</Link>
				<Link to="/change_user">
					<button className="btn btn-success m-2">Change User</button>
				</Link>
			</div>
		</nav>
	);
};

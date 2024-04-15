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
		<nav className="navbar navbar-dark bg-dark mb-2 sticky-top">
			<Link to="/" className="text-decoration-none">
				<span className="navbar-brand m-2 fs-4">{`${username}${endsInS ? "'" : "'s"} Agenda`}</span>
			</Link>
			<div className="ml-auto">
				<Link to="/change_user">
					<button className="btn btn-success m-2">Change User</button>
				</Link>
			</div>
		</nav>
	);
};

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
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">{`${username}${endsInS ? "'" : "'s"} Agenda`}</span>
			</Link>
			<div className="ml-auto">
			</div>
		</nav>
	);
};

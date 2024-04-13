import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import ContactList from "../component/contact_list.jsx"; 

export const Home = () => (
	<div>
		<Link to={"/add_contact"}>
			<button className="btn btn-success">New Contact</button>
		</Link>
		<ContactList></ContactList>
	</div>
);

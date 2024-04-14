import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import ContactList from "../component/contact_list.jsx"; 

export const Home = () => (
	<div className="w-100 d-flex flex-column align-items-center">
		<div className="col-sm-11 col-md-8 col-lg-6">
			<Link to={"/contact_form"}>
				<button className="btn btn-success mb-2">New Contact</button>
			</Link>
			<ContactList></ContactList>
		</div>
	</div>
);

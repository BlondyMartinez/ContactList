import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import ContactList from "../component/contact_list.jsx"; 

export const Home = () => (
	<div className="container">	
		<div className="row d-flex flex-column align-items-center">
			<div className="col-sm-12 col-md-8 col-lg-6">
				<Link to={"/contact_form"}>
					<button className="btn btn-success m-2">New Contact</button>
				</Link>
				<ContactList></ContactList>
			</div>
		</div>
	</div>
);

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import ContactList from "../component/contact_list.jsx"; 
import SearchBar from "../component/search_bar.jsx";

export const Home = () => (
	<div className="container">	
		<div className="row d-flex flex-column align-items-center">
			<div className="col-sm-12 col-md-10 col-lg-10">
				<div className="row d-flex align-items-center justify-content-between mb-2">
					<div className="col-2">
						<Link to={"/contact_form"}>
							<button className="btn btn-success">Add</button>
						</Link>
					</div>
					<div className="col-10">
						<SearchBar></SearchBar>
					</div>
				</div>
				<ContactList></ContactList>
			</div>
		</div>
	</div>
);

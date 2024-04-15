import React from "react";
import { Link } from "react-router-dom";
import UserList from "../component/user_list.jsx"; 
import NewUser from "../component/new_user.jsx";

export const ChangeUser = () => (
	<div className="container">
		<div className="row d-flex flex-column align-items-center">
			<div className="col-sm-12 col-md-8 col-lg-6">
				<UserList></UserList>
				<NewUser></NewUser>
				<Link to="/">
					<span>get back to contacts</span>
				</Link>
			</div>
		</div>
	</div>
);

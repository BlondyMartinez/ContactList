const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			user: {},
			contacts: [],
		},
		actions: {
			loadUserList: () => {
				fetch(`https://playground.4geeks.com/contact/agendas?offset=0&limit=100`)
				.then(response => { return response.json(); })
				.then(data => { setStore({ "users": data.users }); })
				.catch(error => { console.error('Error fetching users:', error); });
			},

			loadContactList: (username) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${username}/contacts`)
				.then(response => { return response.json(); })
				.then(data => { setStore({ "contacts": data.contacts }); })
				.catch(error => { console.error('Error fetching contacts:', error); });
			},

			createUser: (username) => {
				const config = { 
					method: "POST",
					body: JSON.stringify({ "slug": username }),
					headers: { "Accept": "application/json" }
				}

				fetch(`https://playground.4geeks.com/contact/agendas/${username}`, config)
				.then(() => { getActions().loadContactList(username); setStore({ "user": username }); })
				.catch(error => { console.error('Error fetching contacts:', error); });
			}
		}
	};
};

export default getState;

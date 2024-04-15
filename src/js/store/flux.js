import { parsePhoneNumberFromString } from 'libphonenumber-js'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			guest: { "slug": "Guest", "id": "guest" },
			user: { "slug": "Guest", "id": "guest" },
			userCreated: false,
			contacts: [],
			selectedCode: "",
			selectedAlphaCode: "",
			editing: false,
			currentID: null,
		},
		actions: {
			getSelectedUser: (value) => {
				const [slug, id] = value.split("_");
				
				if (id === "guest") {
					setStore({ "user": getStore().guest });
				} else {
					const selectedUser = { "slug": slug, "id": id };
					setStore({ "user": selectedUser });
				}
			},

			loadUserList: () => {
				fetch(`https://playground.4geeks.com/contact/agendas?offset=0&limit=100`)
				.then(response => { return response.json(); })
				.then(data => { setStore({ "users": [getStore().guest, ...data.agendas] }) })
				.catch(error => { console.error('Error fetching users:', error); });
			},

			loadContactList: () => {
				fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts`)
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
				.then((response) => response.json())
				.then((data) => { setStore({ "user": data }); setStore({ "userCreated": true}) })
				.then(() => { getActions().loadContactList(); getActions().loadUserList(); })
				.catch(error => { console.error('Error fetching contacts:', error); });
			},

			addContact: (name, email, phone, address) => {
				let formattedPhone = "";
				if(phone !== "") formattedPhone = parsePhoneNumberFromString('+' + getStore().selectedCode + phone).formatInternational();

				const contact = {
					"name": name,
					"phone": formattedPhone,
					"email": email,
					"address": address,
				}

				const config = { 
					method: "POST",
					body: JSON.stringify(contact),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				}

				fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts`, config)
				.then(response => { return response.json(); })
				.then(() => getActions().loadContactList())
				.catch(error => { console.error('Error fetching contacts:', error); });
			},

			deleteContact(id) {
				const config = { 
					method: "DELETE",
					headers: { 'Accept': 'application/json' }
				}

				fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts/${id}`, config)
				.then(() => getActions().loadContactList())
				.catch(error => { console.error('Error fetching contacts:', error); });
			},

			editContact(name, email, phone, address, id) {
				let formattedPhone = "";
				if(phone !== "") formattedPhone = parsePhoneNumberFromString('+' + getStore().selectedCode + phone).formatInternational();

				const contact = {
					"name": name,
					"phone": formattedPhone,
					"email": email,
					"address": address,
				}

				const config = { 
					method: "PUT",
					body: JSON.stringify(contact),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				}

				fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts/${id}`, config)
				.then(response => { return response.json(); })
				.then(() => getActions().loadContactList())
				.catch(error => { console.error('Error fetching contacts:', error); });
			},
		}
	};
};

export default getState;

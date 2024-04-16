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
			currentPage: "home",
			searchValue: "",
		},
		actions: {
			setCode: (value)  => {
				setStore({ selectedCode: value })
			},

			setAlphaCode: (value) => {
				setStore({ selectedAlphaCode: value })
			},

			getSelectedUser: (value) => {
				const lastUnderscoreIndex = value.lastIndexOf("_");
				if (lastUnderscoreIndex !== -1) {
					const slug = value.substring(0, lastUnderscoreIndex);
					const id = value.substring(lastUnderscoreIndex + 1);
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
				if(getStore().user.id && getStore().user.id !== "guest") {
					fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts`)
					.then(response => { return response.json(); })
					.then(data => { setStore({ "contacts": data.contacts }); })
					.catch(error => { console.error('Error fetching contacts:', error); });
				}
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
					"id": getStore().user.id === "guest" ? name + Math.random() : ""
				}

				if (getStore().user.id !== "guest") {
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
				} else setStore({ contacts: [...getStore().contacts, contact] });
			},

			deleteContact: (id) => {
				if(getStore().user.id !== "guest") {
					const config = { 
						method: "DELETE",
						headers: { 'Accept': 'application/json' }
					}

					fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts/${id}`, config)
					.then(() => getActions().loadContactList())
					.catch(error => { console.error('Error fetching contacts:', error); });
				} else {
					const index = getStore().contacts.findIndex(element => element.id === id);
					if (index !== -1) {
						const updatedContacts = [...getStore().contacts.slice(0, index), ...getStore().contacts.slice(index + 1)];
						setStore({ contacts: updatedContacts });
					}
				}
			},

			editContact: (name, email, phone, address, id) => {
				let formattedPhone = "";
				if(phone !== "") formattedPhone = parsePhoneNumberFromString('+' + getStore().selectedCode + phone).formatInternational();

				const contact = {
					"name": name,
					"phone": formattedPhone,
					"email": email,
					"address": address,
				}

				if(getStore().user.id !== "guest") {
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
				} else {
					const index = getStore().contacts.findIndex(element => element.id === id);
					if (index !== -1) {
						const updatedContacts = [...getStore().contacts];
						updatedContacts[index] = contact;
						setStore({ contacts: updatedContacts });
					}
				}
			},

			setSearchValue: (value) => {
				setStore({ searchValue: value });
			},
		}
	};
};

export default getState;

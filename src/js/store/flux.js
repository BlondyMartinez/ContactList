import { parsePhoneNumberFromString } from 'libphonenumber-js'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			user: { "slug": "blondy" },
			contacts: [],
			selectedCode: "",
			selectedAlphaCode: "",
		},
		actions: {
			loadUserList: () => {
				fetch(`https://playground.4geeks.com/contact/agendas?offset=0&limit=100`)
				.then(response => { return response.json(); })
				.then(data => { setStore({ "users": data.users }); })
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
				.then(() => { getActions().loadContactList(username); setStore({ "user": username }); })
				.catch(error => { console.error('Error fetching contacts:', error); });
			},

			addContact: (name, email, phone, address) => {
				const formattedPhone = 0;
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
			}
		}
	};
};

export default getState;

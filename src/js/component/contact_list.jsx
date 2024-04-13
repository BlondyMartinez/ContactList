import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Contact from "./contact.jsx";

const ContactList = () => {
    const { store } = useContext(Context);

    const contacts = store.contacts;

    return (
        <div>
            {contacts.map((contact) => (
                <React.Fragment key={contact.id}>
                    <Contact name={contact.name} id={contact.id} email={contact.email} phone={contact.phone} address={contact.address} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default ContactList;
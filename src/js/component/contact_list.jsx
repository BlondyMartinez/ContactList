import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ContactMobile from "./contact_mobile_devices.jsx";
import ContactPC from "./contact_pc.jsx"

const ContactList = () => {
    const { store } = useContext(Context);

    store.editing = false;
    store.userCreated = false;

    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 1024px)').matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        const listener = () => setIsMobile(mediaQuery.matches);

        mediaQuery.addEventListener('change', listener);

        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    return (
        <div style={{ paddingBottom: "4rem" }} className="d-flex flex-column align-items-center justify-content-center">
            {store.contacts.map((contact, index) => {
                if (store.searchValue !== "" && !contact.name.toLowerCase().includes(store.searchValue.toLowerCase())) return null;

                return (
                    <React.Fragment key={contact.id}>
                        {isMobile 
                            ? <ContactMobile name={contact.name} id={contact.id} email={contact.email} phone={contact.phone} address={contact.address} index={index} /> 
                            : <ContactPC name={contact.name} id={contact.id} email={contact.email} phone={contact.phone} address={contact.address} index={index} />
                        }
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ContactList;
import React, { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Context } from "../store/appContext";

const SearchBar = () => {
    const { store, actions } = useContext(Context);

    return (
        store.contacts.length > 0 &&
            (<div className="d-flex align-items-center search-bar">
                <Icon className="fs-3" icon="material-symbols:search" />
                <input className="search-bar p-0" type="text" value={store.searchValue} onChange={(e) => { actions.setSearchValue(e.target.value) }} />
                <button type="button" className="btn btn-icon p-0" onClick={() => actions.setSearchValue("")}>
                    <Icon className="fs-5" icon="material-symbols:close" />
                </button>
            </div>)
    )
}

export default SearchBar;
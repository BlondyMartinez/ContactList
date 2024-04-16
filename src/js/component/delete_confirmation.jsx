import React, {useContext } from "react";
import { Context } from "../store/appContext";

const DeleteConfirmationModal = (props) => {
    const { actions } = useContext(Context);

    return (
        <div className={`modal fade ${props.show ? 'show' : ''}`} style={{ display: props.show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1"  aria-hidden={!props.show}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header modal-bg">
                        <h5 className="modal-title" id="staticBackdropLabel">Confirm deletion</h5>
                        <button type="button" className="btn-close" onClick={props.onClose}></button>
                    </div>
                    <div className="modal-body modal-bg">
                        <span>{`Are you sure you want to delete ${props.name} from your contact list?`}</span>
                    </div>
                    <div className="modal-footer modal-bg">
                        <button className="btn btn-success" onClick={() => { actions.deleteContact(props.id); }}>Yes</button>
                        <button className="btn btn-danger" onClick={props.onClose}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal;
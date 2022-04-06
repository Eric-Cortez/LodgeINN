import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import SpotHostForm from '../../components/SpotHostForm/index.js';

function AddHostFormModal({type}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {type === "listing-page" &&
            <button  className="another-spot" onClick={() => setShowModal(true)}>Host another spot</button>  }
            {type === "home" &&
                <button className="centered-button" onClick={() => setShowModal(true)}>Host</button> 
            }
            {!type &&
                <button id="review-preview-edit" className='nav-hover' onClick={() => setShowModal(true)}> Become A Host</button>}
     

            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                }}>
                    <SpotHostForm setShowModal={setShowModal} />
                    
                </Modal>
            )}
        </>
    );
}

export default AddHostFormModal;
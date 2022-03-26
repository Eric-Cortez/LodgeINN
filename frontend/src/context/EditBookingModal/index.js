import React, { useState } from 'react';
import EditBookingForm from '../../components/Forms/EditBookingForm';
import { Modal } from '../Modal';
import "../Modal.css"


function EditBookingModal({ spotId, booking }) {
    const [showModal, setShowModal] = useState(false);
   

    return (
        <>
            <button id="review-preview-edit" onClick={() => setShowModal(true)}><i className="fas fa-edit booking"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  
                    <EditBookingForm setShowModal={setShowModal} spotId={spotId} booking={booking}/>
                </Modal>
            )}
        </>
    );
}

export default EditBookingModal;
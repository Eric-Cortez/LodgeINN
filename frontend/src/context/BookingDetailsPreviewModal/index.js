import React, { useState } from 'react';
// import EditBookingForm from '../../components/Forms/EditBookingForm';
import { Modal } from '../Modal';
import "../Modal.css"
import BookingPreviewDetails from '../../components/BookingPreviewDetails';


function BookingDetailsPreviewModal({ allSpots, spotId, date, allUsers, type }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className='location-title-modal-btn' onClick={() => setShowModal(true)}><h4 className='location-title-modal-btn'>trip details</h4></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>

                    <BookingPreviewDetails allSpots={allSpots} spotId={spotId} date={date} allUsers={allUsers}/>
                  
                </Modal>
            )}
        </>
    );
}

export default BookingDetailsPreviewModal;
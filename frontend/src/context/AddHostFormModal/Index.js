import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import SpotHostForm from '../../components/SpotHostForm/index.js';

function AddHostFormModal({type}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="review-preview-edit" className='nav-hover' onClick={() => setShowModal(true)}>{type === "listing-page" ? "Host another spot" : "Become A Host"}</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                }}>
                    <SpotHostForm setShowModal={setShowModal} />
                    {/* <EditReviewForm reviewId={reviewId} spotId={spotId} setShowModal={setShowModal} /> */}
                </Modal>
            )}
        </>
    );
}

export default AddHostFormModal;
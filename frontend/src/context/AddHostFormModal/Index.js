import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import SpotHostForm from '../../components/SpotHostForm/index.js';

function AddHostFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="review-preview-edit" onClick={() => setShowModal(true)}>Become A Host</button>
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
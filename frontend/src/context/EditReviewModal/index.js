import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import EditReviewForm from '../../components/Forms/EditReviewForm';

function EditReviewModal({ reviewId, spotId }) {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <>
            <button id="review-preview-edit" onClick={() => setShowModal(true)}><i className="fas fa-edit"></i></button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                }}>
                    <EditReviewForm reviewId={reviewId} spotId={spotId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditReviewModal;
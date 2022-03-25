import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import SignupForm from '../../components/SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="login-btn nav-hover login-page" onClick={() => setShowModal(true)}>Sign up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
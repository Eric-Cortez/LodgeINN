import React, { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import { Modal } from '../Modal';
import "../Modal.css"


function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="login-btn nav-hover" onClick={() => setShowModal(true)}>Log in</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
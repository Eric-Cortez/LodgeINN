import React, { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import { Modal } from '../Modal';
import "../Modal.css"


function LoginFormModal() {
    const [showModal, setShowLoginModal] = useState(false);
   

    return (
        <>
            <button className="login-btn nav-hover" onClick={() => setShowLoginModal(true)}>Log in</button>
            {showModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal}/>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
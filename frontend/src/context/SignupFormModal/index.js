import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import SignupForm from '../../components/SignupForm';

function SignupFormModal({ setShowLoginModal, type }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {type === "login" ?
            <button className="login-btn-modal" onClick={() => {
                    setShowModal(true)
            }}>Sign up</button>:
            <button className="login-btn nav-hover login-page" onClick={() => setShowModal(true)}>Sign up</button>
        }
            {showModal &&  (
                <Modal onClose={() =>{
                    if(setShowLoginModal){
                        setShowLoginModal(false) 
                    }
                    setShowModal(false)}}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
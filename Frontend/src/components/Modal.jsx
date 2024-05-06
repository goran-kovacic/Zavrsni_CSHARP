import React from 'react';

const Modal = ({ imageUrl, closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <img src={imageUrl} alt="Large Image" />
            </div>
        </div>
    );
};

export default Modal;
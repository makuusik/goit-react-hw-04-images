import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContent } from './ModalStyled';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalOverlay>
      <ModalContent>
        <img src={largeImageURL} alt="" />
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

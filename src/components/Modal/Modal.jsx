import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContent } from './ModalStyled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return (
      <ModalOverlay>
        <ModalContent>
          <img src={largeImageURL} alt="" />
        </ModalContent>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

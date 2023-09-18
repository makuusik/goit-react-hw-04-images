import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './ButtonStyled';

const Button = ({ onClick, isVisible }) =>
  isVisible && (
    <ButtonWrapper type="button" onClick={onClick}>
      Load more
    </ButtonWrapper>
  );

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Button;

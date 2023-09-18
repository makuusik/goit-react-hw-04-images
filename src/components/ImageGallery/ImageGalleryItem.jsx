import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryItemWrapper,
  GalleryImage,
} from './ImageGalleryItemStyled';

const ImageGalleryItem = ({ image, onClick }) => (
  <ImageGalleryItemWrapper>
    <GalleryImage
      src={image.webformatURL}
      alt={image.tags}
      className="gallery-image"
      onClick={() => onClick(image.largeImageURL)}
    />
  </ImageGalleryItemWrapper>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

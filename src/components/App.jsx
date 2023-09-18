import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import './styles.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoreImages, setNoMoreImages] = useState(false);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setNoMoreImages(false);
  };

  const fetchImages = useCallback(() => {
    if (isLoading || noMoreImages) {
      return;
    }

    const API_KEY = '38394863-d0bf61be8343901c1ba6a4493';

    setIsLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          setNoMoreImages(true);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [isLoading, noMoreImages, page, query]);

  useEffect(() => {
    if (query && (page === 1 || page === 0)) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLoadMore = () => {
    fetchImages();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !noMoreImages && (
        <Button onClick={handleLoadMore} isVisible={!isLoading} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
      {noMoreImages && <p>No more images found.</p>}
    </div>
  );
}

export default App;

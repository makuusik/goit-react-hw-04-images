import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import './styles.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    showModal: false,
    isLoading: false,
    noMoreImages: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page, isLoading, noMoreImages } = this.state;

    if (isLoading || noMoreImages) {
      return;
    }

    const API_KEY = '38394863-d0bf61be8343901c1ba6a4493';

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          this.setState({ noMoreImages: true });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            page: prevState.page + 1,
          }));
        }
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1, noMoreImages: false });
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: '', showModal: false });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.handleCloseModal();
    }
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, noMoreImages } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !noMoreImages && (
          <Button onClick={this.handleLoadMore} isVisible={!isLoading} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        {noMoreImages && <p>No more images found.</p>}
      </div>
    );
  }
}

export default App;

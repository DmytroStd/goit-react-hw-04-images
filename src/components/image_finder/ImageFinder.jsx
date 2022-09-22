import { useState, useEffect } from 'react';
import Pixabay from 'components/api/api';
import ImageGallery from 'components/image_gallery/ImageGallery';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import Button from 'components/button/Button';
import PropTypes from 'prop-types';

// export default class ImageFinder extends Component {
//   state = {
//     images: null,
//     loading: false,
//     largeImageURL: '',
//     error: null,
//     total: null,
//   };
const ImageFinder = ({ page, query, loadMore }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (query) {
      fetchImages();
    }

    async function fetchImages() {
      try {
        setLoading(true, page);
        const { data } = await Pixabay(page, query);
        setImages(data.hits);
        setTotal(data.total);
      } catch (error) {
        setError(error);
        console.log('message', error.message);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (page !== '' && page !== 1) {
      fetchImages();
    }

    async function fetchImages() {
      try {
        setLoading(true);
        const { data } = await Pixabay(page, query);
        setImages([...images, ...data.hits]);
        setTotal(data.total);
      } catch (error) {
        setError(error);
        console.log('message', error.message);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const toggleModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  return (
    <>
      {loading && <Loader />}
      {images && <ImageGallery images={images} toggleModal={toggleModal} />}
      {12 * page <= total && <Button onClick={loadMore} text={'load more'} />}
      {largeImageURL && <Modal onClose={toggleModal} src={largeImageURL} />}
      {error && <p>(error.message)</p>}
    </>
  );
};

ImageFinder.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageFinder;

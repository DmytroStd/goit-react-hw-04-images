import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageFinder from './image_finder/ImageFinder';

// export class App extends Component {
//   state = {
//     page: 1,
//     search: '',
//   };
const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleFormSubmt = search => {
    setPage(1);
    setSearch(search);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmt} />
      <ImageFinder query={search} loadMore={loadMore} page={page} />
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

export default App;

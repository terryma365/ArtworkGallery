import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GallaryList from '../GallaryList/GallaryList';
import ArtWorkDetails from '../ArtWorkDetails/ArtWorkDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GallaryList />}></Route>
          <Route path='/artwork/:artWorkId' element={<ArtWorkDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

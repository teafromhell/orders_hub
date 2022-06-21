import './styles/App.scss';
import ListPage from './pages/ListPage';
import { Routes, Route } from 'react-router-dom';
import SingleTaskPage from './pages/SingleTaskPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/:oguid' element={<SingleTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;

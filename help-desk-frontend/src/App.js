
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/register';
import { Toaster } from 'react-hot-toast';
import Login from './pages/LoginPage';

function App() {
  return (
    <div className='App font-opensans'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />

    </div>
  );
}

export default App;

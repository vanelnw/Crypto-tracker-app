
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Alert from './components/Alert';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
        <Alert />
      </Box>
    </BrowserRouter>
  );
}

export default App;

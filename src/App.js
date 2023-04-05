import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './components/RegisterPage';
import NavbarMain from './components/Navbar';
import LoginPage from './components/LoginPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarMain />
        <Routes>

          <Route element={<RegisterPage />} path="/register" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

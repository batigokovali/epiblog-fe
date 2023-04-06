import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './components/RegisterPage';
import NavbarMain from './components/Navbar';
import LoginPage from './components/LoginPage';
import Blogposts from './components/Blogposts';


function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarMain />
        <Routes>
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<LoginPage />} path="/" />
          <Route element={<Blogposts />} path="/blogposts" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

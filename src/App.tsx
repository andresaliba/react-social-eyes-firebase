import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login";
import { NavbarGlobal } from "./components/navbar";
import { CreatePost } from "./pages/create-post/create-post";
import "flowbite/dist/flowbite.css";
import { About } from "./pages/contact/about";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <NavbarGlobal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/contact" element={<About />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CustomNavbar from "./components/CustomNavbar.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AllPlayersPage from "./pages/AllPlayersPage.jsx";

// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';


// App component is essentially the top most component in a
// React-based application, from whom all other components are children of
function App() {
    return (
        <BrowserRouter>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="all-players" element={<AllPlayersPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

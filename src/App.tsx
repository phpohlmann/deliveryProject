import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import RestaurantPage from './pages/restaurantPage';
import './index.css'; 

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/restaurant/:id" element={<RestaurantPage/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

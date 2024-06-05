import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CanvasPage from "./pages/CanvasPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import EventsPage from "./pages/EventsPage.jsx"; // Import the EventsPage component
import LoginPage from "./pages/LoginPage.jsx";
import Footer from "./components/Footer.jsx"; // Import the Footer component
import Header from "./components/Header.jsx"; // Import the Header component

const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={isAuthenticated() ? <Index /> : <Navigate to="/login" />} />
            <Route path="/canvas" element={isAuthenticated() ? <CanvasPage /> : <Navigate to="/login" />} />
            <Route path="/news" element={isAuthenticated() ? <NewsPage /> : <Navigate to="/login" />} />
            <Route path="/events" element={isAuthenticated() ? <EventsPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CanvasPage from "./pages/CanvasPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import Footer from "./components/Footer.jsx"; // Import the Footer component
import Header from "./components/Header.jsx"; // Import the Header component

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header /> {/* Add the Header component here */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/canvas" element={<CanvasPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </div>
        <Footer /> {/* Add the Footer component here */}
      </div>
    </Router>
  );
}

export default App;
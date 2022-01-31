import Gallery from "./components/Gallery";
import Marketplace from "./components/Marketplace";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults"
import Account from "./components/Account"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/callback" element={<Navigate replace to="/" />} />        
          <Route exact path="/marketplace" element={<Marketplace/>}/>
          <Route exact path="/gallery" element={<Gallery/>}/>
          <Route exact path="/search" element={<SearchResults />} />
          <Route exact path="/account" element={<Account />} />
        </Routes>
      </Router>
  );
}

export default App;

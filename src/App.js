import Gallery from "./components/Gallery";
import Marketplace from "./components/Marketplace";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults"
import Account from "./components/Account"
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, currentNetwork } = useAuth();

  return (
    <>
    { user ?
    <></>
    :
    <Alert status='error'>
            <AlertIcon />
            <AlertTitle mr={2}>You're not logged in!</AlertTitle>
            <AlertDescription>Log In to use all functionalities.</AlertDescription>
    </Alert>
    }
    {
      currentNetwork===4 ?
      <></>
      :
      <Alert status='error'>
            <AlertIcon />
            <AlertTitle mr={2}>Wrong Network!</AlertTitle>
            <AlertDescription>Change to Rinkeby and refresh the app.</AlertDescription>
    </Alert>
    }
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
    </>
    
  );
}

export default App;

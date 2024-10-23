import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp, SignIn, CreateListing, BidPage, HomePage } from "./pages/index";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/biding/:id" element={<BidPage />} />
            <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

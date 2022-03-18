import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots "
import SpotDetail from "./components/SpotDetail";
import SpotHostForm from './components/SpotHostForm'
import Home from "./components/Home";
import EditSpotForm from "./components/EditSpotForm"
import Footer from "./components/Footer";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <Spots />
          </Route>
          {/* <Route exact path="/spots/host">
            <SpotHostForm />
          </Route> */}
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path="/spots/:spotId/host">
            <EditSpotForm />
          </Route>
          <Route>
            <h1> Page Not Found: 404</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
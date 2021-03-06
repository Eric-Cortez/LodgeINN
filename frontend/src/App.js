import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots "
import SpotDetail from "./components/SpotDetail";
import Home from "./components/Home";
import EditSpotForm from "./components/EditSpotForm"
import Footer from "./components/Footer";
import TripPage from "./components/TripsPage";
import Listings from "./components/ListingsPage";
import NotFound from "./components/NotFound";
import BookingConfirmation from "./components/BookingConfirmation";


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
          <Route exact path="/spots">
            <Spots />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path="/spots/:spotId/host">
            <EditSpotForm />
          </Route>
          <Route exact path="/users/:userId/listings">
            <Listings />
          </Route>
          <Route exact path="/users/:userId/trips">
            <TripPage />
          </Route>
          <Route exact path="/users/:userId/bookings/:bookingId">
            <BookingConfirmation />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
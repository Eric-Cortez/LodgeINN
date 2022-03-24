// import React, { useState, useMemo, useCallback, useRef }from 'react'
// import { 
//   useLoadScript,
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   Circle,
//   MarkerClusterer,
// } from "@react-google-maps/api"


// // const google = new google()
// // const LatLngLiteral =  google.maps.LatLngLiteral;



// function GoogleMapMarkers() {
//   let environment = process.env.REACT_APP_GOOGLE_API_KEY
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: environment,
//     libraries: ["places"]
//   })
//   console.log(isLoaded)
//   const center = useMemo(() => ({ lat: 43, lng: -80 }), []);

//   if (!isLoaded) return <div className = 'map-image'>Loading...</div>
 
//   return (
//     <>
//       <div id="map" className='map-image'> 
//       hi
//       <GoogleMap
//       zoom={10}
//       center={{ lat: 43, lng: -80 }}
//       mapContainerClassName="map-container"
//       ></GoogleMap>
//       </div>
//     </>
//   )
// }
// export default GoogleMapMarkers;
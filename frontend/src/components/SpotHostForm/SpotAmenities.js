import React from 'react'

const SpotAmenities = ({
    step,
    setStep,
    kitchen,
    setKitchen,
    privateBeachAccess,
    setPrivateBeachAccess,
    firePlace,
    setFirePlace,
    parking,
    setParking,
    pool,
    setPool,
    hotTub,
    setHotTub,
    pets,
    setPets,
}) => {
  return (
      <div className='host-spot-outer-form'>
          <h2>Let guests know what your place has to offer</h2>
          <h6>Do you have any standout amenities?</h6>
          
          <div id="right-host-form">
              <h3 className="title-center">Amenities</h3>
              <div id="amenities">
                  <label htmlFor="kitchen"
                      className="host-labels-box"
                  >Kitchen:
                      <input
                          id="kitchen"
                          type="checkbox"
                          checked={kitchen}
                          onChange={(e) => setKitchen(!kitchen)}
                      />
                  </label>
                  <label htmlFor="privateBeachAccess"
                      className="host-labels-box"
                  >Private Beach Access:
                      <input
                          id="privateBeachAccess"
                          type="checkbox"
                          checked={privateBeachAccess}
                          onChange={(e) => setPrivateBeachAccess(!privateBeachAccess)}
                      />
                  </label>
                  <label htmlFor="firePlace"
                      className="host-labels-box"
                  >Fire Place:
                      <input
                          id="firePlace"
                          type="checkbox"
                          checked={firePlace}
                          onChange={(e) => setFirePlace(!firePlace)}
                      />
                  </label>
                  <label htmlFor="parking"
                      className="host-labels-box"
                  >Parking:
                      <input
                          id="parking"
                          type="checkbox"
                          checked={parking}
                          onChange={(e) => setParking(!parking)}
                      />
                  </label>
                  <label htmlFor="pool"
                      className="host-labels-box"
                  >Pool:
                      <input
                          id="pool"
                          type="checkbox"
                          checked={pool}
                          onChange={(e) => setPool(!pool)}
                      />
                  </label>
                  <label htmlFor="hotTub"
                      className="host-labels-box"
                  >Hot Tub:
                      <input
                          id="hotTub"
                          type="checkbox"
                          checked={hotTub}
                          onChange={(e) => setHotTub(!hotTub)}
                      />
                  </label>
                  <label htmlFor="pets"
                      className="host-labels-box"
                  >Pets:
                      <input
                          id="pets"
                          type="checkbox"
                          checked={pets}
                          onChange={(e) => setPets(!pets)}
                      />
                  </label>
              </div>
          </div>
          
          <button onClick={()=> setStep(step -1)}>Back</button>
          <button onClick={()=> setStep(step + 1)}>next</button>
         
    </div>
  )
}

export default SpotAmenities
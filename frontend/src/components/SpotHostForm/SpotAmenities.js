import React from 'react'
import "./spotHostForm.css"
import "../Forms/GlobalForm.css"

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

    console.log(kitchen)

  return (
      <div className='host-spot-outer-form'>
          <h2 className='create-spot-title'>Let guests know what your place has to offer</h2>
          <h6 className='create-spot-header'>Do you have any standout amenities?</h6>
          <div className='errors-container'>
              <ul className="form-errors-ul">
                  
              </ul>
          </div>
          <div className='main-input-div'>
              <div className='inputs-container amenities'>
                  <div className='each-checkbox-div'>
                  <input
                      id="kitchen"
                      type="checkbox"
                      checked={kitchen}
                      onChange={(e) => setKitchen(!kitchen)}
                  />
                  <label htmlFor="kitchen"
                      className="host-labels-box"
                  >Kitchen</label>
                  </div>
                  <div className='each-checkbox-div'>
                  <input
                      id="privateBeachAccess"
                      type="checkbox"
                      checked={privateBeachAccess}
                      onChange={(e) => setPrivateBeachAccess(!privateBeachAccess)}
                  />
                  <label htmlFor="privateBeachAccess"
                      className="host-labels-box"
                  >Private Beach Access</label>
                  </div>
                 
                 <div className='each-checkbox-div'>
                     <input
                         id="firePlace"
                         type="checkbox"
                         checked={firePlace}
                         onChange={(e) => setFirePlace(!firePlace)}
                     />
                  <label htmlFor="firePlace"
                      className="host-labels-box"
                  >Fire Place</label>
                </div>
                  <div className='each-checkbox-div'>
                      <input
                          id="parking"
                          type="checkbox"
                          checked={parking}
                          onChange={(e) => setParking(!parking)}
                      />
                  <label htmlFor="parking"
                      className="host-labels-box"
                  >Parking</label>
                </div>
                <div className='each-checkbox-div'>
                    <input
                        id="pool"
                        type="checkbox"
                        checked={pool}
                        onChange={(e) => setPool(!pool)}
                    />
                  <label htmlFor="pool"
                      className="host-labels-box"
                  >Pool</label>
                </div>
                  <div className='each-checkbox-div'>
                      <input
                          id="hotTub"
                          type="checkbox"
                          checked={hotTub}
                          onChange={(e) => setHotTub(!hotTub)}
                      />
                  <label htmlFor="hotTub"
                      className="host-labels-box"
                  >Hot Tub</label>
                </div>
                <div className='each-checkbox-div'>
                    <input
                        id="pets"
                        type="checkbox"
                        checked={pets}
                        onChange={(e) => setPets(!pets)}
                    />
                  <label htmlFor="pets"
                      className="host-labels-box"
                  >Pets </label>
                </div>
              </div>
          </div>
          <div className='host-btn-next-back'>
            <button 
            className="back-btn"
            onClick={()=> setStep(step -1)}>Back</button>
            <button 
            className="next-btn"
            onClick={()=> setStep(step + 1)}>next</button>
          </div>
         
    </div>
  )
}

export default SpotAmenities
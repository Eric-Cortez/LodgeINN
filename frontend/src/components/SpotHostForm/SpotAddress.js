import React, {useState, useEffect }from 'react'
import { states } from '../utils.js'

const SpotAddress = ({
    step,
    setStep,
    country,
    setCountry,
    state,
    setState,
    zipCode,
    setZipCode,
    address,
    setAddress,
    city,
    setCity,

}) => {

  const [displayErrors, setDisplayErrors] = useState(false)
  const [errors, setErrors] = useState([])

   useEffect(()=> {
       const errors = [];
       if (address?.length > 255 || address?.length === 0) errors.push("Address must be less 255 characters")
       if (city?.length > 255 || city?.length === 0) errors.push("City must be less 255 characters")
       if (state === '--Select a State--') errors.push("Please select a state")
       if (country?.length > 50 || country?.length === 0) errors.push("Country must be less 50 characters")
       if ((zipCode?.length > 0 && zipCode?.length > 6) || zipCode?.length === 0) errors.push("Please provide a valid zip code")
        setErrors(errors)
    }, [address, city, state, country,zipCode])
    

    return (
        <div className='host-spot-outer-form'>
            <h2>Where's your place located?</h2>

            <ul className="errors-center">
                {displayErrors && errors.map(error => (
                    <li className="list-of-err" key={error}> •  {error}</li>
                ))}
            </ul>

            <label
                className="host-labels"
            > Address
                <input
                    className="new-input"
                    required
                    type='text'
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label
                className="host-labels"
            > City
                <input
                    className="new-input"
                    required
                    type='text'
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </label>

            <label id="select"
                className="host-labels"
            > State
                <select
                    required
                    type='text'
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                >
                    {states.map(state => (
                        <option key={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </label>
            <label
                className="host-labels"
            > Country
                <input
                    className="new-input"
                    required
                    type='text'
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
            </label>
            <label
                className="host-labels"
            > Zip Code
                <input
                    className="new-input"
                    required
                    id="num-input"
                    type='number'
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                />
            </label>
            
            <button onClick={() => {
                if(errors.length){
                    setDisplayErrors(true)
                } else {
                    setStep(step + 1)
                }
            }}>Next</button>
        </div>
    )
}

export default SpotAddress
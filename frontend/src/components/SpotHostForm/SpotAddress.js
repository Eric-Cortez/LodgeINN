import React, { useState, useEffect } from 'react'
import { states } from '../utils.js'
import "../Forms/GlobalForm.css"


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

    useEffect(() => {
        const errors = [];
        if (address?.length > 255 || address?.length === 0) errors.push("Address must be less 255 characters")
        if (city?.length > 255 || city?.length === 0) errors.push("City must be less 255 characters")
        if (state === '--Select a State--') errors.push("Please select a state")
        if (country?.length > 50 || country?.length === 0) errors.push("Country must be less 50 characters")
        if ((zipCode?.length > 0 && zipCode?.length > 6) || zipCode?.length === 0) errors.push("Please provide a valid zip code")
        setErrors(errors)
    }, [address, city, state, country, zipCode])


    return (
        <div className='host-spot-outer-form'>

            <h2 className='create-spot-title'> Where's your place located?</h2>

            <div className='errors-container'>
                <ul className="form-errors-ul">
                    {displayErrors && errors.map(error => (
                        <li className="form-errors" key={error}> *  {error}</li>
                    ))}
                </ul>
            </div>
            <div className='main-input-div'>
                <div className='inputs-container'>
                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Address  </label>
                        <input
                            className="input host"
                            required
                            type='text'
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />

                    </div>
                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > City</label>
                        <input
                            className="input host"
                            required
                            type='text'
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                    </div>

                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > State </label>
                        <select
                            className="input select host"
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
                    </div>

                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Country </label>
                        <input
                            className="input host"
                            required
                            type='text'
                            placeholder="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                    </div>

                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Zip Code</label>
                        <input
                            className="input host"
                            required
                            id="num-input"
                            type='number'
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />

                    </div>
                </div>
            </div>
            <div className='host-btn-div'>
                <button onClick={() => {
                    if (errors.length) {
                        setDisplayErrors(true)
                    } else {
                        setStep(step + 1)
                    }
                }}
                className="next-btn"
                >Next</button>
            </div>
        </div>
    )
}

export default SpotAddress
import React, { useState, useEffect } from 'react'
import "./spotHostForm.css"
import "../Forms/GlobalForm.css"

const SpotInfo = ({
    guests,
    setGuests,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    setStep,
    step,
    price,
    setPrice
}) => {

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (price < 1 && price !== 0) errors.push("Please provide a valid price per night")
        if (guests < 1 && guests !== 0) errors.push("Please provide a guest count.")
        if (bedrooms < 1 && bedrooms !== 0) errors.push("Please provide a bedroom count.")
        if (bathrooms < 1 && bathrooms !== 0) errors.push("Please provide a bathroom count.")
        setErrors(errors)
    }, [price, guests, bedrooms, bathrooms])

    return (
        <div className='host-spot-outer-form'>
            <div className='top-modal-form'>
            <h2 className='create-spot-title'>Tell us more about your spot</h2>
            <h6 className='create-spot-header'>How many guests would you like to host?</h6>

            <div className='errors-container'>
                <ul className="form-errors-ul">
                    {displayErrors && errors.map(error => (
                        <li className="form-errors" key={error}> •  {error}</li>
                    ))}
                </ul>
            </div>
                     
            <div className='main-input-div'>
                <div className='inputs-container'>

                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Guests </label>
                        <input
                            className="input host"
                            id="num-input"
                            required
                            type='number'
                            placeholder="Guests"
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                        />

                    </div>
                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Bedrooms</label>
                        <input
                            className="input host"
                            id="num-input"
                            required
                            type='number'
                            placeholder="Bedrooms"
                            value={bedrooms}
                            onChange={e => setBedrooms(e.target.value)}
                        />
                    </div>
                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Bathrooms</label>
                        <input
                            className="input host"
                            id="num-input"
                            required
                            type='number'
                            placeholder="Bathrooms"
                            value={bathrooms}
                            onChange={e => setBathrooms(e.target.value)}
                        />
                    </div>

                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Price per night</label>
                        <input
                            className="input host"
                            required
                            id="num-input"
                            type='number'
                            placeholder="Cost Per Night"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            </div>
            <div className='host-btn-next-back'>
                <button
                    onClick={() => setStep(step - 1)}
                    className="back-btn"
                >Back</button>
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

export default SpotInfo
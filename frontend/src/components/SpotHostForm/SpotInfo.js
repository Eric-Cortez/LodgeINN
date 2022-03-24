import React, { useState, useEffect } from 'react'
import "./spotHostForm.css"

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
            <h2>Tell us more about your spot</h2>
            <h6>How many guests would you like to host?</h6>


            <ul className="errors-center">
                {displayErrors && errors.map(error => (
                    <li className="list-of-err" key={error}> •  {error}</li>
                ))}
            </ul>

            <label
                className="host-labels"
            > Guests:
                <input
                    className="new-input"
                    id="num-input"
                    required
                    type='number'
                    placeholder="Guests"
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                />
            </label>
            <label
                className="host-labels"
            > Bedrooms
                <input
                    className="new-input"
                    id="num-input"
                    required
                    type='number'
                    placeholder="Bedrooms"
                    value={bedrooms}
                    onChange={e => setBedrooms(e.target.value)}
                />
            </label>
            <label
                className="host-labels"
            > Bathrooms
                <input
                    className="new-input"
                    id="num-input"
                    required
                    type='number'
                    placeholder="Bathrooms"
                    value={bathrooms}
                    onChange={e => setBathrooms(e.target.value)}
                />
            </label>


            <label
                className="host-labels"
            > Price per night
                <input
                    className="new-input"
                    required
                    id="num-input"
                    type='number'
                    placeholder="Cost Per Night"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </label> 

          
            <button onClick={() => setStep(step - 1)}>Back</button>
            <button onClick={() => {
                if (errors.length) {
                    setDisplayErrors(true)
                } else {
                    setStep(step + 1)
                }
            }}>next</button>

        </div>
    )
}

export default SpotInfo
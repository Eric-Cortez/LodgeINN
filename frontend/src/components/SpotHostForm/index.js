import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { states } from '../utils.js'
import { addSpot } from "../../store/spots"

function SpotHostForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)
        
 

    const [title, setTitle] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [guests, setGuests] = useState("")
    const [bedrooms, setBedrooms] = useState("")
    const [bathrooms, setBathrooms] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        //!!START SILENT
        const payload = {
          userId: session.user.id,
          address,
          city,
          state,
          country,
          title,
          description,
          price,
          zipCode,
          guests,
          bedrooms,
          bathrooms
        };
        // let createdSpot = await dispatch(addSpot(payload))
       
        // if (createdSpot) {
        //     history.push(`/spots/${createdSpot.id}`)
        // }

        let createdSpot;
        try {
            createdSpot = await dispatch(addSpot(payload));
        } catch (error) {
            throw new Error("This did not work!!")
            // if (error instanceof ValidationError) setErrorMessages(error.errors);
            // // If error is not a ValidationError, add slice at the end to remove extra
            // // "Error: "
            // else setErrorMessages({ overall: error.toString().slice(7) })
        }
        //!!END
        if (createdSpot) {
        //     //!!START SILENT
        //     setErrorMessages({});
        //     //!!END
            history.push(`/spots/${createdSpot.id}`);
        //     hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        //!!START SILENT
        // setErrorMessages({});
        //!!END
        // hideForm();
    };

    return (
        <div>
            <h1>Cabin Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Cabin Name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <select
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
                <input
                    type='text'
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    type='number'
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type='number'
                    placeholder="Cost Per Night"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <input
                    type='number'
                    placeholder="Guests"
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                />
                <input
                    type='number'
                    placeholder="Beds"
                    value={bedrooms}
                    onChange={e => setBedrooms(e.target.value)}
                />
                <input
                    type='number'
                    placeholder="Baths"
                    value={bathrooms}
                    onChange={e => setBathrooms(e.target.value)}
                />
                <button type="submit">Create new Spot</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default SpotHostForm;
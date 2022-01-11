import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { states } from '../utils.js'
import { addSpot } from "../../store/spots"
import "./spotHostForm.css"

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
    const [url, setUrl] = useState("")
    const [kitchen, setKitchen] = useState(false);
    const [privateBeachAccess, setPrivateBeachAccess] = useState(false);
    const [firePlace, setFirePlace] = useState(false);
    const [parking, setParking] = useState(false);
    const [pool, setPool] = useState(false);
    const [hotTub, setHotTub] = useState(false);
    const [pets, setPets] = useState(false);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (address.length > 255) errors.push("Address must be less 255 characters")
        if (city.length > 255) errors.push("City must be less 255 characters")
        if (state.length > 50) errors.push("State must be less 50 characters")
        if (country.length > 50) errors.push("Country must be less 50 characters")
        if (title.length > 100) errors.push("Title must be less 100 characters")
        if (!description) errors.push("Please provide a description")
        if (price < 1) errors.push("Please provide a price per night")
        if (zipCode.length > 0 && zipCode.length > 6) errors.push("Please provide a valid zip code")
        if (guests < 1) errors.push("Please provide a guest count.")
        if (bedrooms < 1) errors.push("Please provide a bedroom count.")
        if (bathrooms < 1) errors.push("Please provide a bathroom count.")
        if (url.length > 255) errors.push("Please provide valid Image address(url).")
        setValidationErrors(errors)
    }, [address, city, state, country, title, description, price,zipCode,guests,bedrooms,bathrooms])





    const handleSubmit = async (e) => {
        e.preventDefault();

        //!!START SILENT
        const payload = {
         amenities: {
             kitchen,
             privateBeachAccess,
             firePlace,
             parking,
             pool,
             hotTub,
             pets,
         },
         image: {
            url 
         },
         spots:{
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
         } 
        }
       
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
            // console.log(createdSpot)
            history.push(`/spots/${createdSpot.id.id}`);
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
        <div id="form-container">
            <h1>Host Form</h1>
            <div id="host-form" >
                <form onSubmit={handleSubmit}>
                    <ul className="errors">
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <label> Spot Name: 
                        <input
                            required
                            type='text'
                            placeholder="Spot Name"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    <label> Country:
                        <input
                            required
                            type='text'
                            placeholder="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            />
                    </label>
                    <label id="select"> State:
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
                    <label> City:
                        <input
                            required
                            type='text'
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>
                    <label> Address:
                        <input
                            required
                            type='text'
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                    <label> Zip Code:
                        <input
                            required
                            id="num-input"
                            type='number'
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </label>
                    <label> Description:
                        <input
                            required
                            type='text'
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <label> Price:
                        <input
                            required
                            id="num-input"
                            type='number'
                            placeholder="Cost Per Night"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    <label> Guests:
                        <input
                            required
                            type='number'
                            placeholder="Guests"
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                        />
                    </label>
                    <label> Bedrooms:
                        <input
                            required
                            type='number'
                            placeholder="Bedrooms"
                            value={bedrooms}
                            onChange={e => setBedrooms(e.target.value)}
                        />
                    </label>
                    <label> bathrooms
                        <input
                            required
                            type='number'
                            placeholder="Bathrooms"
                            value={bathrooms}
                            onChange={e => setBathrooms(e.target.value)}
                        />
                    </label>
                    <label> Image url: 
                        <input
                            required
                            type='string'
                            placeholder="image url"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                    </label>
                    <label htmlFor="kitchen">Kitchen:
                    <input
                        id="kitchen"
                        type="checkbox"
                        checked={kitchen} 
                        onChange={(e) => setKitchen(!kitchen)}
                    />  
                    </label>        
                    <label htmlFor="privateBeachAccess">Private Beach Access:
                        <input
                            id="privateBeachAccess"
                            type="checkbox"
                            checked={privateBeachAccess}
                            onChange={(e) => setPrivateBeachAccess(!privateBeachAccess)}
                        />
                    </label>  
                    <label htmlFor="firePlace">Fire Place:
                        <input
                            id="firePlace"
                            type="checkbox"
                            checked={firePlace}
                            onChange={(e) => setFirePlace(!firePlace)}
                        />
                    </label>
                    <label htmlFor="parking">Parking:
                        <input
                            id="parking"
                            type="checkbox"
                            checked={parking}
                            onChange={(e) => setParking(!parking)}
                        />
                    </label>        
                    <label htmlFor="pool">Pool:
                        <input
                            id="pool"
                            type="checkbox"
                            checked={pool}
                            onChange={(e) => setPool(!pool)}
                        />
                    </label>  
                    <label htmlFor="hotTub">Hot Tub:
                        <input
                            id="hotTub"
                            type="checkbox"
                            checked={hotTub}
                            onChange={(e) => setHotTub(!hotTub)}
                        />
                    </label> 
                    <label htmlFor="pets">Pets:
                        <input
                            id="pets"
                            type="checkbox"
                            checked={pets}
                            onChange={(e) => setPets(!pets)}
                        />
                    </label>   
                    <button 
                    className="host-form" 
                    disabled={validationErrors.length > 0}
                    type="submit">Create new Spot</button>
                    <button className="host-form" type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
            
        </div>
    )
}

export default SpotHostForm;
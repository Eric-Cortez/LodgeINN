import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
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
        if (title?.length > 100 || title?.length === 0) errors.push("Title must be less 100 characters")
        if (country?.length > 50 || country?.length === 0) errors.push("Country must be less 50 characters")
        if (state === '--Select a State--') errors.push("Please select a state")
        if (city?.length > 255 || country?.length === 0) errors.push("City must be less 255 characters")
        if (address?.length > 255 || address?.length === 0) errors.push("Address must be less 255 characters")
        if (zipCode?.length > 0 && zipCode?.length > 6 || zipCode?.length === 0) errors.push("Please provide a valid zip code")
        if (!description?.length || description?.length === 0) errors.push("Please provide a description")
        if (price < 1 && price !== 0) errors.push("Please provide a valid price per night")
        if (guests < 1 && guests !== 0) errors.push("Please provide a guest count.")
        if (bedrooms < 1 && bedrooms !== 0) errors.push("Please provide a bedroom count.")
        if (bathrooms < 1 && bathrooms !== 0) errors.push("Please provide a bathroom count.")
        if (url?.length > 255 || url?.length === 0 || !url?.includes("http" || "https")) errors.push("Please provide valid Image address(url)")
        setValidationErrors(errors)
    }, [address, city, state, country, title, description, price, zipCode, guests, bedrooms, bathrooms, url])




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
            spots: {
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

        let createdSpot;
        try {
            createdSpot = await dispatch(addSpot(payload));
        } catch (error) {
            throw new Error("Error - Resource not found")
            // if (error instanceof ValidationError) setErrorMessages(error.errors);
            // // If error is not a ValidationError, add slice at the end to remove extra
            // // "Error: "
            // else setErrorMessages({ overall: error.toString().slice(7) })
        }
        if (createdSpot) {

            history.push(`/spots/${createdSpot.id.id}`);
        }
    };

    return (
        <div id="host-form" >
            <form onSubmit={handleSubmit}>
                <div id="form-container">
                        <div id="top-host-form">
                            <h1>Host Form</h1>
                            <ul className="errors-center">
                                {validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>

                        <div id="left-host-form">
                            <h3 className="title-center">Spot Details</h3>
                            <label
                            className="host-labels"
                            > Title
                                <input
                                    
                                    className="host-input new-input"
                                    required
                                    type='text'
                                    placeholder="Spot Name"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
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
                            <label
                                className="host-labels"
                            > Price
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
                            > Image url
                                <input
                                    className="new-input"
                                    id="image-inp"
                                    required
                                    type='string'
                                    placeholder="image url"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                />
                            </label>
                        </div>


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
                          
                            <label
                            className="host-labels-box"
                            > Description
                                <br></br>
                                <textarea
                                    required
                                    type='text'
                                    placeholder="Spot Description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </label>
                            <button
                                id="host-btn"
                                className="host-form"
                                disabled={validationErrors.length > 0}
                                type="submit">Submit</button>
                            <Link id="host-cancel-btn" exact="true" to="/">Cancel</Link>
                        </div>
                </div>
            </form>
        </div>
    )
}

export default SpotHostForm;
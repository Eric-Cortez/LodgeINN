import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { states } from '../utils.js'
import { editSpot } from "../../store/spots"
import "./EditSpotForm.css"
import { getOneSpot } from "../../store/spots"

function EditSpotForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)
    const { spotId } = useParams()
    const spotInfo = useSelector(state => state.spots[spotId])


    const [title, setTitle] = useState(spotInfo?.title)
    const [country, setCountry] = useState(spotInfo?.country)
    const [state, setState] = useState(spotInfo?.state)
    const [city, setCity] = useState(spotInfo?.city)
    const [address, setAddress] = useState(spotInfo?.address)
    const [zipCode, setZipCode] = useState(spotInfo?.zipCode)
    const [description, setDescription] = useState(spotInfo?.description)
    const [price, setPrice] = useState(spotInfo?.price)
    const [guests, setGuests] = useState(spotInfo?.guests)
    const [bedrooms, setBedrooms] = useState(spotInfo?.bedrooms)
    const [bathrooms, setBathrooms] = useState(spotInfo?.bathrooms)
    const [url, setUrl] = useState(spotInfo?.Images[0]?.url)
    const [kitchen, setKitchen] = useState(spotInfo?.Amenities[0]?.kitchen);
    const [privateBeachAccess, setPrivateBeachAccess] = useState(spotInfo?.Amenities[0]?.privateBeachAccess);
    const [firePlace, setFirePlace] = useState(spotInfo?.Amenities[0]?.firePlace);
    const [parking, setParking] = useState(spotInfo?.Amenities[0]?.parking);
    const [pool, setPool] = useState(spotInfo?.Amenities[0]?.pool);
    const [hotTub, setHotTub] = useState(spotInfo?.Amenities[0]?.hotTub);
    const [pets, setPets] = useState(spotInfo?.Amenities[0]?.pets);
    const [validationErrors, setValidationErrors] = useState([])

  
    useEffect(() => {
        dispatch(getOneSpot(spotId))
        if (title) localStorage.setItem("title", spotInfo?.title)
        if (country) localStorage.setItem("country", spotInfo?.country)
        if (state) localStorage.setItem("state", spotInfo?.state)
        if (city) localStorage.setItem("city", spotInfo?.city)
        if (address) localStorage.setItem("address", spotInfo?.address)
        if (zipCode) localStorage.setItem("zipCode", spotInfo?.zipCode)
        if (description) localStorage.setItem("description", spotInfo?.description)
        if (price) localStorage.setItem("price", spotInfo?.price)
        if (guests) localStorage.setItem("guests", spotInfo?.guests)
        if (bedrooms) localStorage.setItem("bedrooms", spotInfo?.bedrooms)
        if (bathrooms) localStorage.setItem("bathrooms", spotInfo?.bathrooms)
        if (url) localStorage.setItem('url', spotInfo?.Images[0]?.url)
        if (kitchen) localStorage.setItem('kitchen', spotInfo?.Amenities[0]?.kitchen)
        if (privateBeachAccess) localStorage.setItem('privateBeachAccess', spotInfo?.Amenities[0]?.privateBeachAccess)
        if (firePlace) localStorage.setItem('firePlace', spotInfo?.Amenities[0]?.firePlace)
        if (parking) localStorage.setItem('parking', spotInfo?.Amenities[0]?.parking)
        if (pool) localStorage.setItem('pool', spotInfo?.Amenities[0].pool)
        if (hotTub) localStorage.setItem('hotTub', spotInfo?.Amenities[0]?.hotTub)
        if (pets) localStorage.setItem('pets', spotInfo?.Amenities[0]?.pets)
    }, [])

    useEffect(() => {
        dispatch(getOneSpot(spotId))

        const localTitle = localStorage.getItem("title")
        setTitle(localTitle)
        const localCountry = localStorage.getItem("country");
        setCountry(localCountry)
        const localState = localStorage.getItem("state");
        setState(localState)
        const localCity = localStorage.getItem("city");
        setCity(localCity)
        const localAddress = localStorage.getItem("address");
        setAddress(localAddress)
        const localZipCode = localStorage.getItem("zipCode");
        setZipCode(localZipCode)
        const localDescription = localStorage.getItem("description");
        setDescription(localDescription)
        const localPrice = localStorage.getItem("price");
        setPrice(localPrice)
        const localGuests = localStorage.getItem("guests");
        setGuests(localGuests)
        const localBedrooms = localStorage.getItem("bedrooms");
        setBedrooms(localBedrooms)
        const localBathrooms = localStorage.getItem("bathrooms");
        setBathrooms(localBathrooms)
        const localUrl= localStorage.getItem("url");
        setUrl(localUrl)
        const localKitchen = localStorage.getItem("kitchen");
        setKitchen(localKitchen === 'true' ? true : false)
        const localPrivateBeachAccess = localStorage.getItem("privateBeachAccess");
        setPrivateBeachAccess(localPrivateBeachAccess === 'true' ? true : false)
        const localFirePlace = localStorage.getItem("firePlace");
        setFirePlace(localFirePlace === 'true' ? true : false)
        const localParking = localStorage.getItem("parking");
        setParking(localParking === 'true' ? true : false)
        const localPool = localStorage.getItem("pool");
        setPool(localPool === 'true' ? true : false)
        const localHotTub = localStorage.getItem("hotTub");
        setHotTub(localHotTub === 'true' ? true : false)
        const localPets = localStorage.getItem("pets");
        setPets(localPets === 'true' ? true : false)
    }, [])

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
        if (bedrooms < 1 &&  bedrooms !== 0) errors.push("Please provide a bedroom count.")
        if (bathrooms < 1 && bathrooms !== 0) errors.push("Please provide a bathroom count.")
        if (url?.length > 255 || url?.length === 0 || !url?.includes("http" || "https")) errors.push("Please provide valid Image address(url)")
        setValidationErrors(errors)
    }, [address, city, state, country, title, description, price, zipCode, guests, bedrooms, bathrooms,url])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            amenities: {
                id: spotInfo?.Amenities[0]?.id,
                kitchen,
                privateBeachAccess,
                firePlace,
                parking,
                pool,
                hotTub,
                pets,
            },
            image: {
                id: spotInfo?.Images[0]?.id,
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
            createdSpot = await dispatch(editSpot(payload, spotId));
        } catch (error) {
            throw new Error("This did not work!!")
            // if (error instanceof ValidationError) setErrorMessages(error.errors);
            // // If error is not a ValidationError, add slice at the end to remove extra
            // // "Error: "
            // else setErrorMessages({ overall: error.toString().slice(7) })
        }
        //!!END
        if (createdSpot) {
            //     setErrorMessages({});
            history.push(`/spots/${createdSpot.id.id}`);
            localStorage.clear();
        }
    };

    return (
        <div id="host-form" >
            <form onSubmit={handleSubmit}>
                <div id="form-container">
                    <div id="top-host-form">
                        <h1 className="Upper-title">Host Edit Form</h1>
                        <ul className="errors-center">
                            {validationErrors.map(error => (
                                <li className="list-of-err" key={error}> •  {error}</li>
                            ))}
                        </ul>
                    </div>

                    <div id="left-host-form">
                        <h3 className="title-center"></h3>
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
                                className="new-input" 
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
                    <label
                        id="host-labels-box"
                        className="host-labels"
                    > Description
                        <br></br>
                        <textarea
                            id="text-id"
                            className="new-input" 
                            required
                            type='text'
                            placeholder="Spot Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>

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
                        <button
                            id="host-btn"
                            className="host-form"
                            disabled={validationErrors.length > 0}
                            type="submit">Submit</button>
                        <Link id="host-cancel-btn" exact="true" to={`/spots/${spotId}`}>Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default EditSpotForm;
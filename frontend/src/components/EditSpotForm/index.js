import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { states } from '../utils.js'
import { editSpot } from "../../store/spots"
import "./EditSpotForm.css"
import { getOneSpot } from "../../store/spots"
import "../Forms/GlobalForm.css"

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
    const [displayErrors, setDisplayErrors] = useState(false);

    console.log(validationErrors, displayErrors, "errors status")
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
        const localUrl = localStorage.getItem("url");
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
        if ((zipCode?.length > 0 && zipCode?.length > 6) || zipCode?.length === 0) errors.push("Please provide a valid zip code")
        if (!description?.length || description?.length === 0) errors.push("Please provide a description")
        if (price < 1 && price !== 0) errors.push("Please provide a valid price per night")
        if (guests < 1 && guests !== 0) errors.push("Please provide a guest count.")
        if (bedrooms < 1 && bedrooms !== 0) errors.push("Please provide a bedroom count.")
        if (bathrooms < 1 && bathrooms !== 0) errors.push("Please provide a bathroom count.")
        if (url?.length > 255 || url?.length === 0 || !url?.includes("http" || "https")) errors.push("Please provide valid Image address(url)")
        setValidationErrors(errors)
    }, [ address, city, state, country, title, description, price, zipCode, guests, bedrooms, bathrooms, url])


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
        console.log("hhhh")
        console.log(payload)


        let createdSpot;

        if (validationErrors && validationErrors.length === 0) {
            createdSpot = await dispatch(editSpot(payload, spotId));
        } else {
            setDisplayErrors(true)
            const div = document.getElementById("top-host-form")
            div.style.visibility = "visible"
            div.style.color = "white"
            div.style.backgroundColor = "rgba(229,30,80, 0.9)"
            div.style.borderRadius = "10px"
            div.style.position = "fixed"
            div.style.top = "100px"
            div.style.right = "20px"
            div.style.fontSize = "18px"
            div.style.fontWeight = "400"
            div.style.padding = "15px"
            setTimeout(() => div.style.visibility = "hidden", 3000)
        }

        if(createdSpot){
            history.push(`/spots/${createdSpot.id.id}`);
            localStorage.clear();
        }

        // try {
        //     createdSpot = await dispatch(editSpot(payload, spotId));
        // } catch (error) {
        //     setDisplayErrors(true)
        //     throw new Error("This did not work!!")
        //     // if (error instanceof ValidationError) setErrorMessages(error.errors);
        //     // // If error is not a ValidationError, add slice at the end to remove extra
        //     // // "Error: "
        //     // else setErrorMessages({ overall: error.toString().slice(7) })
        // }
        // //!!END
        // if (createdSpot) {
        //     //     setErrorMessages({});
        //     history.push(`/spots/${createdSpot.id.id}`);
        //     localStorage.clear();
        // }
    };

    return (
        <div id="host-form-edit" >
            <form onSubmit={handleSubmit}>

                    <h1>Edit Spot Details</h1>
                <div id="top-host-form">
                        {displayErrors && validationErrors.map(error => (
                            <div className="list-of-err" key={error}> * {error}</div>
                        ))}
                </div>
                <div className="form-line"></div>
                <h3 className="edit-spot-title"> Location </h3>
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

                <div className="form-line"></div>
                <h3 className="edit-spot-title"> Spot Details </h3>
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



                <div className="form-line"></div>
                <h3 className="edit-spot-title"> Amenities </h3>
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



                <div className="form-line"></div>
                <h3 className="edit-spot-title"> Description </h3>
                <div className='main-input-div'>
                    <div className='inputs-container'>

                        <div className='input-div-host'>
                            <label
                                className='input-label'
                            > Title </label>
                            <input
                                className="input host"
                                required
                                type='text'
                                placeholder="Spot Name"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='input-div-host'>
                            <label
                                className='input-label'
                            > Description </label>
                            <textarea
                                id="text-id"
                                className="input host"
                                required
                                type='text'
                                placeholder="Spot Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />

                        </div>
                    </div>
                </div>


                <div className="form-line"></div>
                <h3 className="edit-spot-title"> Lodge Photo </h3>

                <div className='main-input-div image'>
                    <div className='inputs-container'>

                        <div className='input-div-host'>
                            <label
                                className='input-label'
                            > Image url </label>
                            <input
                                className="input host"
                                required
                                type='string'
                                placeholder="image url"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                            />

                        </div>
                    </div>
                </div>
                <div className="form-line"></div>
                <div className="edit-cancel-div">
                    <Link  className="host-cancel-btn" exact="true" to={`/spots/${spotId}`}>Cancel</Link>
                    <button
                        id="host-btn"
                        className="host-form edit-spot"
                        // disabled={validationErrors.length > 0}
                        type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default EditSpotForm;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { addSpot, getAllSpots } from "../../store/spots"
import "./spotHostForm.css"
import SpotInfo from "./SpotInfo.js";
import SpotAddress from "./SpotAddress.js";
import SpotDescription from "./SpotDescription";
import SpotImage from "./SpotImage";
import HostSpotConfirmation from "./HostSpotConfirmation";
import SpotAmenities from "./SpotAmenities";

function SpotHostForm({ setShowModal }) {
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
    const [step, setStep] = useState(1)
    const [displayErrors, setDisplayErrors] = useState(false);
    const [errors, setErrors] = useState([])

    const allAmenitiesArr = {
        kitchen,
        privateBeachAccess,
        firePlace,
        parking,
        pool,
        hotTub,
        pets
    }

    useEffect(() => {
        const errors = []
        if (address?.length > 255 || address?.length === 0) errors.push("Address must be less 255 characters")
        if (city?.length > 255 || city?.length === 0) errors.push("City must be less 255 characters")
        if (state === '--Select a State--') errors.push("Please select a state")
        if (country?.length > 50 || country?.length === 0) errors.push("Country must be less 50 characters")
        if ((zipCode?.length > 0 && zipCode?.length > 6) || zipCode?.length === 0) errors.push("Please provide a valid zip code")
        if (title?.length > 100 || title?.length === 0) errors.push("Title must be less 100 characters")
        if (!description?.length || description?.length === 0) errors.push("Please provide a description")
        if (!url) errors.push("Please provide an image")
        if (!url?.includes("http" || "https") || !url.includes(".")) errors.push("Please provide a valid image Url")
        if (url?.length > 255 || url?.length === 0) errors.push("Image url must be less than 255 characters")
        if (price < 1 && price !== 0) errors.push("Please provide a valid price per night")
        if (guests < 1 && guests !== 0) errors.push("Please provide a guest count.")
        if (bedrooms < 1 && bedrooms !== 0) errors.push("Please provide a bedroom count.")
        if (bathrooms < 1 && bathrooms !== 0) errors.push("Please provide a bathroom count.")
        setErrors(errors)
    }, [url,
        address,
        city, 
        state, 
        country, 
        zipCode,
        title,
        description,
        price, 
        guests, 
        bedrooms, 
        bathrooms])

    useEffect(() => {

    }, [allAmenitiesArr,
        kitchen,
        privateBeachAccess,
        firePlace,
        parking,
        pool,
        hotTub,
        pets,
     displayErrors])

    

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                userId: session?.user?.id,
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
        if(payload && errors.length === 0) {
           
            createdSpot = await dispatch(addSpot(payload));
            await dispatch(getAllSpots())
        } 
        // else if (errors.length > 0) {
        //     setDisplayErrors(true)
        // }
        if (createdSpot) {
            setShowModal(false)
            history.push(`/spots/${createdSpot.id.id}`);
        }

    };




    return (
        <form className="host-form-outer" onSubmit={handleSubmit}>
           {/* {(displayErrors && step === 6)&&
            <div id="host-spot-form"> 
            * Unsuccessful
            <br/>
            Please review details
            </div>} */}
            

            {step === 1 &&
                <SpotAddress
                    step={step}
                    setStep={setStep}
                    country={country}
                    setCountry={setCountry}
                    state={state}
                    setState={setState}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                />}

            {step === 2 &&
                <SpotInfo
                    guests={guests}
                    setGuests={setGuests}
                    bedrooms={bedrooms}
                    setBedrooms={setBedrooms}
                    bathrooms={bathrooms}
                    setBathrooms={setBathrooms}
                    step={step}
                    setStep={setStep}
                    price={price}
                    setPrice={setPrice}
                />}

            {step === 3 &&
                <SpotAmenities
                    step={step}
                    setStep={setStep}
                    kitchen={kitchen}
                    setKitchen={setKitchen}
                    privateBeachAccess={privateBeachAccess}
                    setPrivateBeachAccess={setPrivateBeachAccess}
                    firePlace={firePlace}
                    setFirePlace={setFirePlace}
                    parking={parking}
                    setParking={setParking}
                    pool={pool}
                    setPool={setPool}
                    hotTub={hotTub}
                    setHotTub={setHotTub}
                    pets={pets}
                    setPets={setPets}
                />}


            {step === 4 &&
                <SpotDescription
                    step={step}
                    setStep={setStep}
                    description={description}
                    setDescription={setDescription}
                    title={title}
                    setTitle={setTitle}
                />}

            {step === 5 &&
                <SpotImage
                    step={step}
                    setStep={setStep}
                    url={url}
                    setUrl={setUrl}
                />
            }

            {step === 6 &&
                <HostSpotConfirmation
                    address={address}
                    city={city}
                    state={state}
                    country={country}
                    zipCode={zipCode}
                    guests={guests}
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    price={price}
                    allAmenitiesArr={allAmenitiesArr}
                    title={title}
                    description={description}
                    url={url}
                    step={step}
                    setStep={setStep}
                />}

        </form>
    )
}

export default SpotHostForm;
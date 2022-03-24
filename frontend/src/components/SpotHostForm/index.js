import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { addSpot } from "../../store/spots"
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
    const [validationErrors, setValidationErrors] = useState([])
    const [step, setStep] = useState(1)




    // useEffect(() => {
    //     const errors = [];
      
        
    //     setValidationErrors(errors)
    // }, [ title, description, price, zipCode, guests, bedrooms, bathrooms, url, step])




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
            setShowModal(false)
            history.push(`/spots/${createdSpot.id.id}`);
        }
    };




    return (
        <form className="host-form-outer" onSubmit={handleSubmit}>
            {/* <div id="form-container">
                        <div id="top-host-form">
                        <h1 className="Upper-title">Host Form</h1>
                            <ul className="errors-center">
                                {validationErrors.map(error => (
                                        <li className="list-of-err" key={error}> •  {error}</li>
                                ))}
                            </ul>
                        </div>

                        <div id="left-host-form">
                            <h3 className="title-center"></h3>
                    
                           
                            
                        
                      */}



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
            step={step}
            setStep={setStep}
            validationErrors={validationErrors}
            setShowModal={setShowModal}
            />}

            {step === 6 && 
            <button
                id="host-btn"
                className="host-form"
                disabled={validationErrors.length > 0}
                type="submit">Submit</button>}
        </form>
    )
}

export default SpotHostForm;
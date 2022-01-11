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
    const [zipCode, setZipCode] = useState(111111)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(1)
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

    // console.log("Kitchen",kitchen)
    // console.log("beach", privateBeachAccess)
    // console.log("firePlace", firePlace)
    // console.log("parking", parking)
    // console.log("pool", pool)
    // console.log("hotTub", hotTub)
    // console.log("pets", pets)

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
                    <label> Spot Name: 
                        <input
                            type='text'
                            placeholder="Spot Name"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    <label> Country:
                        <input
                            type='text'
                            placeholder="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            />
                    </label>
                    <label id="select"> State:
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
                    </label>
                    <label> City:
                        <input
                            type='text'
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>
                    <label> Address:
                        <input
                            type='text'
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                    <label> Zip Code:
                        <input
                            type='number'
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </label>
                    <label> Description:
                        <input
                            type='text'
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <label> Price:
                        <input
                            type='number'
                            placeholder="Cost Per Night"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    <label> Guests:
                        <input
                            type='number'
                            placeholder="Guests"
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                        />
                    </label>
                    <label> Bedrooms:
                        <input
                            type='number'
                            placeholder="Bedrooms"
                            value={bedrooms}
                            onChange={e => setBedrooms(e.target.value)}
                        />
                    </label>
                    <label> bathrooms
                        <input
                            type='number'
                            placeholder="Bathrooms"
                            value={bathrooms}
                            onChange={e => setBathrooms(e.target.value)}
                        />
                    </label>
                    <label> Image url: 
                        <input
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
                    <button className="host-form" type="submit">Create new Spot</button>
                    <button className="host-form" type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
            
        </div>
    )
}

export default SpotHostForm;
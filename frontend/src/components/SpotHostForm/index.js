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
        
 

    const [title, setTitle] = useState("test")
    const [country, setCountry] = useState("test")
    const [state, setState] = useState("test")
    const [city, setCity] = useState("test")
    const [address, setAddress] = useState("test")
    const [zipCode, setZipCode] = useState(111111)
    const [description, setDescription] = useState("test")
    const [price, setPrice] = useState(0)
    const [guests, setGuests] = useState(0)
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [url, setUrl] = useState("https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")

    const handleSubmit = async (e) => {
        e.preventDefault();

        //!!START SILENT
        const payload = {
         
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
                    <button className="host-form" type="submit">Create new Spot</button>
                    <button className="host-form" type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
            
        </div>
    )
}

export default SpotHostForm;
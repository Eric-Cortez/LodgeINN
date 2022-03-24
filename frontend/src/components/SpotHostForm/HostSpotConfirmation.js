import React from 'react'
import { Link } from 'react-router-dom'

const HostSpotConfirmation = ({
  step,
  setStep,
  address,
  city,
  state,
  country,
  zipCode,
  guests,
  bedrooms,
  bathrooms,
  price,
  allAmenitiesArr,
  title,
  description,
  url
}) => {

  const filterAmenities = (amenitiesObj) => {
     let resArr = []
    for (let key in amenitiesObj) {
      if(amenitiesObj[key]) resArr.push(key)
    }
    return resArr
  }
 const filteredArrAmen = filterAmenities(allAmenitiesArr)

  return (
    <div className='host-spot-outer-form'>
      <h2 className='confirmation-host-header'>Confirm hosting details</h2>
      <div className='confirm-details'>
        <h3>Location <button  className="confirm-edit" onClick={() => setStep(1)}><i class="fas fa-edit"></i></button></h3> 
      <p>{`${address}`}</p>
      <p>{`${city}, ${state} ${zipCode} (${country})`}</p>
        <div className='confirm-sub-title'></div>
      <h3>Spot details  <button className="confirm-edit" onClick={() => setStep(2)}><i class="fas fa-edit"></i></button></h3>
      <p>{`Guest limit: ${guests}`}</p>
      <p>{`Bedrooms: ${bedrooms}`}</p>
      <p>{`Bathrooms: ${bathrooms}`}</p>
      <p>{`Price per night: $${price}`}</p>
        <div className='confirm-sub-title'></div>
        <h3>amenities  <button className="confirm-edit" onClick={() => setStep(3)}><i class="fas fa-edit"></i></button></h3>
        {filteredArrAmen && filteredArrAmen?.map(amen => (
        <p key={amen}>{amen}</p>
      ))}
        <div className='confirm-sub-title'></div>
        <h3>Description  <button className="confirm-edit" onClick={() => setStep(4)}><i class="fas fa-edit"></i></button></h3>
        <p>{`Title: ${title}`}</p>
        <p>{`Description: ${description}`}</p>
        <div className='confirm-sub-title'></div>
        <h3>Cabin Photo  <button className="confirm-edit" onClick={() => setStep(5)}><i class="fas fa-edit"></i></button></h3>
      <img className='cabin-image' src={url}/>
      </div>
       
      <div className='host-btn-next-back'>
      <button 
          className="back-btn"
      onClick={() => setStep(step - 1)}>Back</button>
      <button
        className="next-btn"
        type="submit">Submit</button>
        </div>
    </div>
  )
}

export default HostSpotConfirmation
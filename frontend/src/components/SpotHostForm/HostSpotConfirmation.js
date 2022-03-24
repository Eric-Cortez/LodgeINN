import React from 'react'
import { Link } from 'react-router-dom'

const HostSpotConfirmation = ({
    step, 
    setStep,
    setShowModal
}) => {
  return (
    <div className='host-spot-outer-form'>
        <h2>Confirmation Page</h2>
          
        <button onClick={()=> setStep(step - 1)}>Back</button>
          {/* <Link id="host-cancel-btn" exact="true" to="/">Cancel</Link> */}
    </div>
  )
}

export default HostSpotConfirmation
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
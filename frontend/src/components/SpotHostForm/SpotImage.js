import React, { useState, useEffect } from 'react'
import "./spotHostForm.css"
import "../Forms/GlobalForm.css"

const SpotImage = ({
  step,
  setStep,
  url,
  setUrl
}) => {

  const [displayErrors, setDisplayErrors] = useState(false)
  const [errors, setErrors] = useState([])
  useEffect(() => {
    const errors = []
    if (!url) errors.push("Please provide an image")
    if (!url?.includes("http" || "https") || !url.includes(".")) errors.push("Please provide a valid image Url")
    if(url?.length > 255 || url?.length === 0) errors.push("Image url must be less than 255 characters")
    setErrors(errors)
  }, [url])

  return (
    <div className='host-spot-outer-form'>
      <h2 className='create-spot-title'>Next, let's add some photos of your place</h2>
      <div className='errors-container'>

        <ul className="form-errors-ul">
        {displayErrors && errors.map(error => (
          <li className="form-errors" key={error}> •  {error}</li>
        ))}
      </ul>
      </div>
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

      <div className='host-btn-next-back'>
      <button 
      className="back-btn"
      onClick={() => setStep(step - 1)}>Back</button>
      <button 
      className="next-btn"
      onClick={() => {
        if (errors.length) {
          setDisplayErrors(true)
        } else {
          setStep(step + 1)
        }
      }}>Next</button>
      </div>
    </div>
  )
}

export default SpotImage;
import React, { useState, useEffect } from 'react'

const SpotImage = ({
    step,
    setStep,
    url,
    setUrl
}) => {

  const [displayErrors, setDisplayErrors] = useState(false)
  const [errors, setErrors] = useState([])
  console.log(errors)
  useEffect(() => {
    const errors = []
    if (!url) errors.push("Please provide an image")
    // if (!url?.includes("http" || "https")) errors.push("Please provide a valid image Url")
    // if (url?.length > 255 || url?.length === 0) errors.push("Please provide valid Image address(url)")
    setErrors(errors)
  }, [url])

  return (
    <div className='host-spot-outer-form'>
       <h2>Next, let's add some photos of your place</h2>
      <ul className="errors-center">
        {displayErrors && errors.map(error => (
          <li className="list-of-err" key={error}> •  {error}</li>
        ))}
      </ul>
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
        <button onClick={()=>setStep(step - 1)}>Back</button>
      <button onClick={() => {
        if (errors.length) {
          setDisplayErrors(true)
        } else {
          setStep(step + 1)
        }
      }}>Next</button>
    </div>
  )
}

export default SpotImage;
import React, { useState, useEffect } from 'react'

const SpotDescription = ({
    step,
     setStep,
     description,
     setDescription,
     title,
     setTitle
    }) => {

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])
    
    useEffect(()=> {
        const errors = []
        if (title?.length > 100 || title?.length === 0) errors.push("Title must be less 100 characters")
        if (!description?.length || description?.length === 0) errors.push("Please provide a description")
        setErrors(errors)
    }, [title, description])

  return (
      <div className='host-spot-outer-form'>
        <h2>Tell us a bit more</h2>
          <ul className="errors-center">
              {displayErrors && errors.map(error => (
                  <li className="list-of-err" key={error}> •  {error}</li>
              ))}
          </ul>
          <label
              className="host-labels"
          > Title
              <input

                  className="host-input new-input"
                  required
                  type='text'
                  placeholder="Spot Name"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
              />
          </label>
          <label
              id="host-labels-box"
              className="host-labels"
          > Description
              <br></br>
              <textarea
                  id="text-id"
                  className="new-input"
                  required
                  type='text'
                  placeholder="Spot Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
              />
          </label>
          <button onClick={() => setStep(step - 1)}>Back</button>
          <button onClick={() =>{
              if(errors.length){
                  setDisplayErrors(true)
              } else {
                  setStep(step + 1)
              }
          }}>Next</button>
    </div>
  )
}

export default SpotDescription
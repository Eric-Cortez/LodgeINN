import React, { useState, useEffect } from 'react'
import "./spotHostForm.css"
import "../Forms/GlobalForm.css"

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

    useEffect(() => {
        const errors = []
        if (title?.length > 100 || title?.length === 0) errors.push("Title must be less 100 characters")
        if (!description?.length || description?.length === 0) errors.push("Please provide a description")
        setErrors(errors)
    }, [title, description])

    return (
        <div className='host-spot-outer-form'>
            <div className='top-modal-form'>
            <h2 className='create-spot-title'>Tell us a bit more</h2>
            
            <div className='errors-container'>
                <ul className="form-errors-ul">
                {displayErrors && errors.map(error => (
                    <li className="form-errors" key={error}> •  {error}</li>
                ))}
            </ul>
            </div>

            <div className='main-input-div'>
                <div className='inputs-container'>

                    <div className='input-div-host'>
                        <label
                            className='input-label'
                        > Title </label>
                        <input
                            className="input host"
                            required
                            type='text'
                            placeholder="Spot Name"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='input-div-host'>
                    <label
                        className='input-label'
                    > Description </label>
                        <textarea
                            id="text-id"
                            className="input host"
                            required
                            type='text'
                            placeholder="Spot Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                   
                    </div>
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

export default SpotDescription
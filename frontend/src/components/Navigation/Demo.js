import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'

const Demo = () => {
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()

        const credential = 'Demo-lition';
        const password = 'password'
        dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json()
            });
    }

    return (
        <button onClick={handleClick} type='submit'>Demo</button>
    )
}

export default Demo;

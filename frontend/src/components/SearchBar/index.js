import React, { useState, useEffect, Component } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllSearchRes } from '../../store/search';

const SearchBar = () => {
const [search, setSearch] = useState("")
const dispatch = useDispatch()

const handleSubmit = async (e) => {
    e.preventDefault()
    if (search) {
        
        await dispatch(getAllSearchRes(search))
       
    }
}

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            name="search"
            type="text"
            placeholder='Search'
            value={search}
            onChange={e => setSearch(e.target.value)}
            />  
        </form>
    </div>
  )
}

export default SearchBar;
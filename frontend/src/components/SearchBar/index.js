import React, { useState, useEffect, Component } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllSearchRes } from '../../store/search';
import "../Navigation/Navigation.css"

const SearchBar = () => {
const [search, setSearch] = useState("")
const dispatch = useDispatch()

useEffect(() => {

}, [search])

let searchRes;
const handleSubmit = async (e) => {

    e.preventDefault()
    if (search) {
       searchRes = await dispatch(getAllSearchRes(search))   
    }
}
    
    return (
       <>
        <form  className="search-form" onChange={handleSubmit}>
            <input
            name="search"
            type="text"
            placeholder='Search'
            value={search}
            onChange={e => setSearch(e.target.value)}
            />  
        </form>
        <div>

        </div>
       </>

  )
}

export default SearchBar;
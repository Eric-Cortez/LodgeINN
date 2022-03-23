import React, {useEffect} from 'react'
import { deleteBooking, getAllBookings } from '../../store/booking';
import { useDispatch } from 'react-redux';



const DeleteBookingBtn = ({bookingId}) => {
   const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBookings())
    }, [dispatch])

    const handleDelete = (id) => async (e) => {
        e.preventDefault()
        let res;

        if(id){
          res = await dispatch(deleteBooking(id))
        }
     
        if (res) {
            const div = document.createElement("div")
            const div2 = document.getElementById("booking-delete-msg")
            let parentDiv = div2.parentNode
            parentDiv.insertBefore(div,div2)
            div.innerText = "Trip successfully canceled"
            div.style.color = "white"
            div.style.backgroundColor = "rgba(229,30,80, 0.9)"
            div.style.borderRadius = "10px"
            div.style.position = "fixed"
            div.style.top = "100px"
            div.style.right = "20px"
            div.style.fontSize = "18px"
            div.style.fontWeight = "400"
            div.style.padding = "15px"
            setTimeout(() => div.remove(), 2000)
           await dispatch( getAllBookings())
        }
    

    }

  return (
    <div>
          <button onClick={handleDelete(bookingId)}>cancel</button> 
    </div>
  )
}

export default DeleteBookingBtn
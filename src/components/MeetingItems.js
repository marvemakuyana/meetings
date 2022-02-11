import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

const MeetingItems = () => {


    const [items, setItems] = useState([]);
    const { MeetingTypeId } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetingItems/${MeetingTypeId}`)
            .then(res => res.json())
            .then(result => {
                setItems(result)
                console.log(result)
            })
    }, [])


    return (
        <div>
            <h2> Meeting Items</h2>
            <div>

                <p>Meeting Items:</p>

                <div>
                    <p><strong>Item description: </strong>{items.ItemDescription} <strong>Item Due Date:</strong> {items.DueDate}  <Link to={'/updateStatus/' + items.ItemId}> Update Meeting Item Status</Link></p>

                </div>


            </div>
        </div>
    );

}

export default MeetingItems
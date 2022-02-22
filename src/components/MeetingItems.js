import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

const MeetingItems = () => {


    const [items, setItems] = useState([]);
    const [meetingItemStatus, setMeetingItemStatus] = useState([]);
    const { MeetingTypeId } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetingItems/${MeetingTypeId}`)
            .then(res => res.json())
            .then(result => {
                setItems(result)

                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetings/${result.ItemId}`)
                    .then(res => res.json())
                    .then(result => {
                        setMeetingItemStatus(result)
                        console.log(result)
                    })
                console.log(result)
                console.log(result.ItemId)
            })
    }, [])


    return (
        <div>
            <h2> Meeting Items</h2>
            <div>

                <p>Meeting Items:</p>

                <div>
                    <p><strong>Item Description: </strong>{items.ItemDescription} </p>
                    <p> <strong>Item Due Date: </strong> {items.DueDate} </p>
                    <p> <strong>Item Status: </strong> {meetingItemStatus.ItemStatusName} <Link to={'/updateStatus/' + items.ItemId}> Update Meeting Item Status</Link></p>

                </div>


            </div>
        </div>
    );

}

export default MeetingItems
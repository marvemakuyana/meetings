import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateMeetingItemStatus = () => {

    const initialState = {
        ItemStatusName: '',
        ItemStatusId: 0
    }

    const [meetingItemStatus, setMeetingItemStatus] = useState(initialState);

    const { ItemId } = useParams();

    useEffect(() => {

        fetch(`https://localhost:44388/api/meetings/${ItemId}`)
            .then(res => res.json())
            .then(result => {
                setMeetingItemStatus(result)
                console.log(result)
            })


    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setMeetingItemStatus({ ...meetingItemStatus, [name]: value })
    };

    const updateStatus = () => {
        let statusInfo = {
            //ItemId: me
            ItemStatusName: meetingItemStatus.ItemStatusName,


        };

        fetch('https://localhost:44388/api/meetingItemStatus/' + meetingItemStatus.ItemStatusId, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(statusInfo)
        }).then(r => r.json()).then(res => {
            if (res) {
                console.log(res)



            }
        }).catch(err => {
            console.log(err)
        })


    };


    return (
        <div>
            <h2> Meeting Items</h2>
            <div>

                <p>Meeting Items:</p>

                <div>
                    <label>Item Status Name</label>
                    <input type='text' name='ItemStatusName' value={meetingItemStatus.ItemStatusName} onChange={handleInputChange} />

                </div>
                <h4>{meetingItemStatus.ItemStatusName}</h4>
                <button onClick={updateStatus}>Save</button>


            </div>
        </div>
    );

}

export default UpdateMeetingItemStatus
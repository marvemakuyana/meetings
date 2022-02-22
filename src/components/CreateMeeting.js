import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Meetings = () => {
    const initialState = {
        meetingTypeId: 0,
        meetingDate: new Date().toLocaleString(),
        meetingTime: new Date().toLocaleString(),
    }
    const [meetings, setMeetings] = useState(initialState);
    const [meetingsData, setMeetingsData] = useState([]);
    const [meetingType, setMeetingType] = useState([]);
    const [meetingItemStatus, setMeetingItemStatus] = useState([]);
    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const data = localStorage.getItem('meetingItems')

        if (data) {
            setItems(JSON.parse(data))
        }

    }, [])
    useEffect(() => {

        const data = localStorage.getItem('meetingItemsStatus')

        if (data) {
            setItems(JSON.parse(data))
        }

    }, [])

    useEffect(() => {

        const data = localStorage.getItem('meetings')

        if (data) {
            setMeetings(JSON.parse(data))
        }

    }, [])



    useEffect(() => {

        localStorage.setItem('meetings', JSON.stringify(meetings))

    })


    useEffect(() => {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetings/`)
            .then(res => res.json())
            .then(result => {
                setMeetingsData(result)

            })


    }, [])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetingTypes`)
            .then(res => res.json())
            .then(result => {
                setMeetingType(result)
                console.log(result)
            })
    }, []);


    const handleInputChange = event => {
        const { name, value } = event.target
        setMeetings({ ...meetings, [name]: value })
    };

    const handleInputChangeDropdown = event => {
        const { name, value } = event.target
        setMeetings({ ...meetings, [name]: value })

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetingItems/${value}`)
            .then(res => res.json())
            .then(result => {
                setItems(result)
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetings/${result.ItemId}`)
                    .then(res => res.json())
                    .then(result => {
                        setMeetingItemStatus(result)
                        console.log(result)
                    })
                console.log('items', result)
            })

    };
    const handleInputChangeCheckBox = event => {
        setChecked(!checked)

    };


    const handleSubmit = () => {

        let meetingInfo = {
            MeetingId: Math.max.apply(null, meetingsData.map(data => data.MeetingId + 1)),
            MeetingTypeId: meetings.meetingTypeId,
            MeetingDate: meetings.meetingDate,
            MeetingTime: meetings.meetingTime

        };


        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetings`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(meetingInfo)
        }).then(r => r.json()).then(res => {
            if (res) {
                console.log(res)
                if (checked === true) {

                    localStorage.setItem('meetingItems', JSON.stringify(items))
                    localStorage.setItem('meetingItemsStatus', JSON.stringify(meetingItemStatus))
                }

                navigate('/')

            }
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div>
            <h3>Create Meeting...</h3>
            <p>
                <label>Meeting Type : <select name='meetingTypeId' value={meetings.meetingTypeId} onChange={handleInputChangeDropdown}>
                    <option value='0'>Select...</option>
                    {meetingType.map(data => (
                        <option key={data.MeetingTypeId} value={data.MeetingTypeId}>{data.MeetingTypeName}</option>
                    ))}
                </select>
                </label>
            </p>
            <p>
                <label>Meeting Date : <input type="date" value={meetings.meetingDate} name='meetingDate' onChange={handleInputChange}></input></label>
            </p>
            <p>
                <label>Meeting Time : <input type="time" value={meetings.meetingTime} name='meetingTime' onChange={handleInputChange}></input></label>
            </p>
            {meetings.meetingTypeId !== 0 &&
                <div>

                    <p><strong>Meeting Items from the previous meeting:</strong></p>

                    <div>
                        <p><input type='checkbox' value={checked} onChange={handleInputChangeCheckBox} name="checked" /> <strong>Item Description: </strong>{items.ItemDescription} <strong>Item Due Date:</strong> {items.DueDate} <strong>Item Status: </strong> {meetingItemStatus.ItemStatusName}</p>

                    </div>

                </div>
            }
            <div>
                <button onClick={handleSubmit}>Create Meeting</button>
            </div>


        </div>
    );
}

export default Meetings;
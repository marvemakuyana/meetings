import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ViewMeeting from './ViewMeeting';

const HomePage = () => {
    const [meetings, setMeetings] = useState([]);
    const response = JSON.parse(localStorage.getItem("meetings"));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetings`)
            .then(res => res.json())
            .then(result => {
                setMeetings(result)
                console.log(result)
            })
    }, []);

    const handleSubmit = () => {

        navigate('/create')
        localStorage.clear();
    }


    return (
        <div>
            <h3>Click the button below to Capture New Meeting....</h3>
            <button onClick={handleSubmit}>Capture New Meeting</button>
            {response &&
                <div>
                    <ViewMeeting />
                </div>}
            <hr /><br />
            <h3 style={{ textAlign: 'center' }}> Update Meeting Item Status</h3>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>MeetingId</th>
                        <th>MeetingTypeId</th>
                        <th>Meetingdate</th>
                        <th>MeetingTime</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.slice(0, 5).map(meeting => (
                        <tr key={meeting.MeetingId}>
                            <td>{meeting.MeetingId}</td>
                            <td>{meeting.MeetingTypeId}</td>
                            <td >{meeting.MeetingDate}</td>
                            <td >{meeting.MeetingTime}</td>
                            <td><Link to={'/viewmeetingItems/' + meeting.MeetingTypeId}> View Meeting Items</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default HomePage;
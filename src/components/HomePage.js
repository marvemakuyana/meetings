import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meetings`)
            .then(res => res.json())
            .then(result => {
                setMeetings(result)
                console.log(result)
            })
    }, []);


    return (
        <div>
            <h2>Meetings Data...</h2>
            <Link to='/create'>Capture New Meeting</Link><hr /><br />
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '100px' }}>MeetingId</th>
                        <th style={{ width: '100px' }}>MeetingTypeId</th>
                        <th style={{ width: '300px' }}>Meetingdate</th>
                        <th style={{ width: '300px' }}>MeetingTime</th>
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
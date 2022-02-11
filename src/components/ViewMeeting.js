import React, { useEffect, useState } from 'react';

const MeetingItems = () => {

    const meetings = JSON.parse(localStorage.getItem("meetings"));
    const meetingItems = JSON.parse(localStorage.getItem("meetingItems"));
    const [meetingType, settMeetingType] = useState('');


    useEffect(() => {

        if (meetings.meetingTypeId === '1') {
            settMeetingType('MANCO')
        }
        else if (meetings.meetingTypeId === '2') {
            settMeetingType('Finance')
        }
        else if (meetings.meetingTypeId === '3') {
            settMeetingType('Project Team Leaders')
        }

    })


    return (
        <div>
            <div>
                <h2>Meeting Details</h2>
                <p>
                    <strong> Meeting Type : </strong> {meetingType}
                </p>
                <p>
                    <strong> Meeting Date : </strong>  {meetings.meetingDate}
                </p>
                <p>
                    <strong> Meeting Time : </strong> {meetings.meetingTime}
                </p>
            </div>
            <hr />
            {meetingItems &&
                <div>
                    <h2>Meeting Items </h2>
                    <p>
                        <strong>Meeting Type : </strong> {meetingItems.ItemDescription}
                    </p>
                    <p>
                        <strong> Meeting Date :  </strong>{meetingItems.DueDate}
                    </p>
                </div>
            }

        </div>
    );
}

export default MeetingItems;
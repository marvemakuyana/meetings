import React, { useEffect, useState } from 'react';

const ViewMeeting = () => {

    const meetings = JSON.parse(localStorage.getItem("meetings"));
    const meetingItems = JSON.parse(localStorage.getItem("meetingItems"));
    const meetingItemStatus = JSON.parse(localStorage.getItem("meetingItemsStatus"));
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
                <br /><hr />
                <h3>Meeting Details</h3>
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

            {meetingItems &&
                <div>
                    <h2>Carried forward Meeting Items </h2>
                    <p>
                        <strong>Item Description : </strong> {meetingItems.ItemDescription}
                    </p>
                    <p>
                        <strong> Meeting Due Date :  </strong>{meetingItems.DueDate}
                    </p>
                    <p>
                        <strong>Item Status: </strong> {meetingItemStatus.ItemStatusName}
                    </p>
                </div>
            }

        </div>
    );
}

export default ViewMeeting;
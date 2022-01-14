import React from 'react'

function ProfileDetails(props) {
    return (
        <div className="profile-details">
            {props.content}
        </div>
    )
}

ProfileDetails.defaultProps = {
    content:"NA"
}

export default ProfileDetails

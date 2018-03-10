import React from 'react'
import { connect } from 'react-redux'

class Users extends React.Component {
    render() {
        return (
            <div>
                {this.props.users.map(user =>
                    <p key={user._id}>{user.name}</p>
                )}
            </div>
        )    
    }
}

/*const Users = (props) => {
    return (
        <div>
            {this.props.users.map(user =>
                <p>{user.name}</p>
            )}
        </div>
    )
}*/

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Users)
import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Users extends React.Component {
    render() {
        return (
            <div>
                <h2>users</h2>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>blogs added</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.users.map(user =>
                            <Table.Row>
                                <Table.Cell>
                                    <Link to={`/users/${user._id}`}>{user.name}</Link>
                                </Table.Cell>
                                <Table.Cell>{user.blogs.length}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

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
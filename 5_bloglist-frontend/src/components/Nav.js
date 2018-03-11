import React from 'react'
import { connect } from 'react-redux'
import { Menu, Label, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { logout } from './../reducers/loginReducer'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: ''
        }
    }

    handleClick = (event, { name }) => this.setState({ active: name })

    render() {

        const active = this.state.active

        return (
            <Menu>
                <Menu.Item
                    name='blogs'
                    active={active === 'blogs'}
                    onClick={this.handleClick}
                >
                    <NavLink exact to="/" >blogs</NavLink>
                </Menu.Item>
                <Menu.Item
                    name='users'
                    active={active === 'users'}
                    onClick={this.handleClick}
                >
                    <NavLink exact to="/users" >users</NavLink>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='user'
                        active={active === 'user'}
                        onClick={this.handleClick}
                    >
                        <NavLink exact to={`/users/${this.props.user._id}`} >
                            {this.props.user ? `logged in as ${this.props.user.name}` : ''}
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item onClick={this.props.logout}>
                        <Link to='/' >logout</Link>
                    </Menu.Item>
                </Menu.Menu>

            </Menu>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logout })(Nav)
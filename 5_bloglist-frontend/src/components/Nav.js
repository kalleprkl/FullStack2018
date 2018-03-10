import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

class Nav extends React.Component {
    render() {
        return (
            <Menu>
                <Menu.Item></Menu.Item>
            </Menu>
        )
    }
}

export default connect()(Nav)
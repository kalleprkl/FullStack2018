import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    handleClicks = (event) => {
        if (event.target.name === 'like') {
            this.props.update(this.props.blog)
        } else if (event.target.name === 'remove') {
            if (window.confirm(`remove ${this.props.blog.title} by ${this.props.blog.author || 'unknown'}`)) {
                this.props.remove(this.props.blog._id)
            }
        } else {
            this.setState({ visible: !this.state.visible })
        }
    }

    handleLikeClick = (event) => {
        event.preventDefault()
        console.log('like')
    }

    render() {
        const hideWhenVisible = {
            display: this.state.visible ? 'none' : '',
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }
        const showWhenVisible = {
            display: this.state.visible ? '' : 'none',
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        const style = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        const visible = () => (
            <div style={style}>{this.props.blog.title} {this.props.blog.author}</div>
        )
        const hidden = () => (
            <div style={style}>
                {this.props.blog.title}<br />
                {this.props.blog.author}<br />
                <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
                likes {this.props.blog.likes} <button name='like'>like</button><br />
                added by {this.props.blog.user ? this.props.blog.user.name : 'unknown'}<br />
                {!this.props.blog.user || this.props.blog.user.username === this.props.user.username ? <button name='remove'>remove</button> : ''}
            </div>
        )

        return (
            <div onClick={this.handleClicks}>
                {this.state.visible ? hidden() : visible()}
            </div>
        )
    }
}


Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default Blog
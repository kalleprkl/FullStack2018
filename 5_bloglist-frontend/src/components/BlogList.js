import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class BlogList extends React.Component {
    render() {
        return (
            <Table>
                <Table.Body>
                {this.props.blogs.map(blog =>
                    <Table.Row key={blog._id}>
                        <Table.Cell>
                            <Link to = {`/blogs/${blog._id}`}>
                                {blog.title} by {blog.author}
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                )}
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(mapStateToProps)(BlogList)

   
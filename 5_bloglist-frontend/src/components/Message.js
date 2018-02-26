import React from 'react'

const Message = ({ message, error }) => {
    const style = error ? { backgroundColor: 'red' } : { backgroundColor: 'green' }
    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Message
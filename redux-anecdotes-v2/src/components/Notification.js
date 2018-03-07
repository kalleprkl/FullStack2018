import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.store.getState().notifications.map(n => <p>{n}</p>)}
      </div>
    )
  }
}

export default Notification

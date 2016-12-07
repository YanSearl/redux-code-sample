import React from 'react'

export default class Error extends React.Component {
  static propTypes = {
    error: React.PropTypes.any,
    doReset: React.PropTypes.func
  }

  render () {
    if (!this.props.error) return null
    return <div className="flex-column">
      <button onClick={this.props.doReset}>Do Reset</button>
      <span>{this.props.error}</span>
    </div>
  }
}

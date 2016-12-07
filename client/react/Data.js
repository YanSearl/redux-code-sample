import React from 'react'

export default class Data extends React.Component {
  static propTypes = {
    token: React.PropTypes.any,
    isPending: React.PropTypes.bool,
    data: React.PropTypes.any,
    doFetch: React.PropTypes.func,
    doReset: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.doFetch = () => { this.props.doFetch(this.props.token) }
    this.doReset = () => { this.props.doReset() }
  }

  render () {
    if (!this.props.token) return null
    if (this.props.isPending) return <div><span>...</span></div>
    return <div className="flex-column">
      <div className="flex-row">
        <span>{this.props.data}</span>
      </div>
      <div className="flex-row">
        <button onClick={this.doFetch}>Do Data Fetch</button>
        <button onClick={this.doReset}>Do Reset</button>
      </div>
    </div>
  }
}

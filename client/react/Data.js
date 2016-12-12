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

  renderDataItem (data, key) {
    const value = data[key]
    return value !== undefined
      ? <div className="flex-row" key={key}><span>{key}</span><b>{value.toString()}</b></div>
      : null
  }

  renderData (data) {
    return data
      ? ['id', 'name', 'data', 'timestamp'].map((key) => this.renderDataItem(data, key))
      : null
  }

  render () {
    if (!this.props.token) return null
    if (this.props.isPending) return <div><span>Data Pending...</span></div>
    return <div className="flex-column">
      {this.renderData(this.props.data)}
      <div className="flex-row">
        <button onClick={this.doFetch}>Do Data Fetch</button>
        <button onClick={this.doReset}>Do Data Reset</button>
      </div>
    </div>
  }
}

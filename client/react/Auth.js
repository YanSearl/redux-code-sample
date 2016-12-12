import React from 'react'

export default class Auth extends React.Component {
  static propTypes = {
    isPending: React.PropTypes.bool,
    token: React.PropTypes.any,
    doAuth: React.PropTypes.func,
    doReset: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.doAuth = () => { this.props.doAuth(this.state) }
    this.doReset = () => { this.props.doReset() }
    this.setName = (e) => { this.setState({ name: e.target.value }) }
    this.setPassword = (e) => { this.setState({ password: e.target.value }) }
    this.state = { name: '', password: '' }
  }

  render () {
    if (this.props.isPending) return <div><span>Auth Pending...</span></div>
    if (this.props.token) return <div className="flex-row"><button onClick={this.doReset}>Do Auth Reset | token:{this.props.token}</button></div>
    const { name, password } = this.state
    return <div className="flex-column">
      <div className="flex-row">
        <span>Name</span>
        <input value={name} onChange={this.setName}/>
      </div>
      <div className="flex-row">
        <span>Password</span>
        <input value={password} onChange={this.setPassword}/>
      </div>
      <div className="flex-row">
        <button onClick={this.doAuth}>Do Auth</button>
      </div>
    </div>
  }
}

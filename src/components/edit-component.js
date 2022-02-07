import React, { Component } from "react";
import Form from "react-validation/build/form";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import '../styles/edit.css'

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleAddStrike = this.handleAddStrike.bind(this)
    this.onChangeStrike = this.onChangeStrike.bind(this)
    this.handleDelStrike = this.handleDelStrike.bind(this)
    this.onChangeDelStrike = this.onChangeDelStrike.bind(this)
    this.handleAddCrush = this.handleAddCrush.bind(this)
    this.onChangeCrush = this.onChangeCrush.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelCrush = this.handleDelCrush.bind(this)
    this.onChangeDelCrush = this.onChangeDelCrush.bind(this)
    this.optIn = this.optIn.bind(this)
    this.optOut = this.optOut.bind(this)
    this.sleep = this.sleep.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      newStrike: "",
      delStrike: "",
      newCrush: "",
      userList: "",
      delCrush: false
    };
  }

  componentDidMount() {
    AuthService.getUsers().then(res => {
      this.setState({userList: res.data.userList})
    })
  }

  onChangeCrush(e) {
    this.setState({
      newCrush: e.target.value
    });
  }

  handleAddCrush() {
    UserService.addCrush(this.state.currentUser.username, this.state.newCrush)
    .then(this.setUser())
  }

  onChangeStrike(e) {
    this.setState({
      newStrike: e.target.value
    });
  }

  onChangeDelCrush(e) {
    this.setState({
      delCrush: e.target.value
    })
  }

  handleAddStrike() {
    UserService.updateStrikes(this.state.currentUser.username, this.state.newStrike)
    .then(this.setUser())
  }

  onChangeDelStrike(e) {
    this.setState({
      delStrike: e.target.value
    });
  }

  handleDelStrike() {
    UserService.deleteStrike(this.state.currentUser.username, this.state.delStrike)
    .then(this.setUser())
  }

  handleDelCrush() {
    UserService.deleteCrush(this.state.currentUser.username)
    .then(this.setUser())
  }

  setUser(e){
    this.setState({currentUser: AuthService.getCurrentUser()})
  }

  optIn() {
    UserService.optIn(this.state.currentUser.username)
    .then(this.setUser())
  }

  optOut() {
    UserService.optOut(this.state.currentUser.username)
    .then(this.setUser())
  }

  sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.newStrike){
      this.handleAddStrike()
    }
    if(this.state.delStrike){
      this.handleDelStrike()
    }
    if(this.state.newCrush){
      this.handleAddCrush()
    }
    if(this.state.delCrush){
      this.handleDelCrush()
    }
    this.sleep(50).then(r =>{
      window.location.reload()
    })
  }

  render() {
    const userList = Array.from(this.state.userList)
    const { currentUser } = this.state
    console.log(currentUser)
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Preferences
          </h3>
        </header>
        <p>
        <strong>Strikes:</strong>{" "}
          {currentUser.strikes.join(", ")}
        </p>
        <p>
        <strong>Crush:</strong>{" "}
          {currentUser.crush}
        </p>
        <p>
        <strong>Opted-in:</strong>{" "}
          {currentUser.optedIn.toString()}
        </p>
        <div className = "form-box">
            <Form
                onSubmit={this.handleSubmit}
                ref={c => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <select onChange={this.onChangeStrike}> 
                    <option value="Add a Strike"> -- Add a Strike -- </option>
                    {userList.filter(user => user.username !== currentUser.username
                      && user.username !== "Admin"
                      && !currentUser.strikes.includes(user.username)).map((user) => <option value={user.username}>{user.username}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <select onChange={this.onChangeDelStrike}> 
                    <option value="Delete a Strike"> -- Delete a Strike -- </option>
                    {currentUser.strikes.map((strike) => <option value={strike}>{strike}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <select onChange={this.onChangeCrush}> 
                    <option value="Add a Crush"> -- Add a Crush -- </option>
                    {userList.filter(user => user.username !== currentUser.username 
                    && !currentUser.strikes.includes(user.username)
                    && currentUser.crush !== user.username
                    && user.username !== "Admin")
                    .map((user) => <option value={user.username}>{user.username}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <select onChange={this.onChangeDelCrush}> 
                    <option value="Add a Crush"> -- Delete a Crush -- </option>
                    {currentUser.crush && <option value={currentUser.crush}>{currentUser.crush}</option>}
                  </select>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                  >
                    <span>Submit</span>
                  </button>
                </div>
            </Form>
        </div>
              {(currentUser && currentUser.optedIn && 
                <button
                className="btn btn-primary btn-block"
                onClick={this.optOut} >
                  <span>Opt Out</span>
                </button>
                )}
              {(currentUser && !currentUser.optedIn && 
                <button
                className="btn btn-primary btn-block"
                onClick={this.optIn}>
                  <span>Opt In</span>
                </button>
                )}
            </div>
    );
  }
}
import React, { Component } from "react";
import authService from "../services/auth-service";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      currentUser: authService.getCurrentUser()
    };
  }
  componentDidMount() {
    authService.getMatches().then(res => {
        this.setState({
            matches: res.data.matches
        })
    })
  }

  render() {
    const { currentUser } = this.state;
    const matches = Array.from(this.state.matches)
    console.log(currentUser)
    return (
      <div className="container">
        {!currentUser && (
            <header className="jumbotron">
            <h3>"Log in to see stuff :)"</h3>
            </header>
        )}
        {currentUser && (
            matches.map(list => {
                return(
                  <div>{list[0]}, {list[1]}</div>
                );
            })
        )}
      </div>
    );
  }
}
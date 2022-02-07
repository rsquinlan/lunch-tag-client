import React, { Component } from "react";
import AuthService from "../services/auth-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    let prevMatches = [...new Set(currentUser.prevMatches)]
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
        <strong>Strikes:</strong>{" "}
          {currentUser.strikes.join(", ")}
        </p>
        <p>
        <strong>Previous Matches:</strong>{" "}
          {prevMatches.join(", ")}
        </p>
        <p>
        <strong>Crush:</strong>{" "}
          {currentUser.crush}
        </p>
      </div>
    );
  }
}
import React, { Component } from "react";

import AuthService from "../services/auth-service"
import AdminService from "../services/admin-service"
import UserService from "../services/user-service"

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.createMatches = this.createMatches.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.confirmMatches = this.confirmMatches.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userList: "",
      matches: ""
    };
  }

  componentDidMount() {
    AuthService.getUsers().then(res => {
        this.setState({userList: res.data.userList})
      })
  }

  createMatches() {
      let tries = 0
      while(tries <= 500){
        tries = tries + 1
        this.shuffle(Array.from(this.state.userList))
        const userList = Array.from(this.state.userList)
        let arr = userList.filter(user => user.username !== "Admin" && user.optedIn)
        let isOdd = arr.length % 2
        var matches = []
        arr.forEach(user1 => {
          arr.forEach(user2 => {
            if(user1.crush === user2.username && !user2.strikes.includes(user1.username)){
              matches.push([user1.username, user2.username])
              arr = arr.filter(user => user.username !== user1.username && user.username !== user2.username)
            }
          })
        })
        arr.forEach(user1 => {
          arr.forEach(user2 => {
            if(!user1.prevMatches.includes(user2.username) && !user1.prevMatches.includes(user2.username) 
                && !user2.strikes.includes(user1.username) && !user1.strikes.includes(user2.username)
                && !matches.flat().includes(user1.username) && !matches.flat().includes(user2.username)
                && user1.username !== user2.username){
              matches.push([user1.username, user2.username])
              arr = arr.filter(user => user.username !== user1.username && user.username !== user2.username)
            }
          })
        })
        if(arr.length === 0){
          break
        } else if(arr.length === 1 && isOdd){
          console.log(arr[0].username, "was not paired.")
          break
        }
        if(matches){
          this.setState({matches: matches})
        }
      }
      if(tries >= 500){
        console.log("No valid matches found, consider resetting previous matches")
      }
      else if(matches){
        this.setState({matches: matches})
      }
      else{
        console.log("No valid matches found, consider resetting previous matches")
      }
      
  }

  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    this.setState({userList: array})
  }

  confirmMatches(){
    AdminService.confirmMatches(Array.from(this.state.matches))
    const userList = Array.from(this.state.userList)
    let arr = userList.filter(user => user.username !== "Admin" && user.optedIn)
    arr.forEach(user => {
      UserService.deleteCrush(user.username)
    })
    console.log("confirmed :)")
  }


  render() {
    const { currentUser } = this.state;
    const matches = Array.from(this.state.matches)
    return (
      <div className="container">
        {currentUser && currentUser.username !== "Admin" && (
            <header className="jumbotron">
            <h3>"Not Authorized!"</h3>
            </header>
        )}
        {currentUser && currentUser.username === "Admin" && (
            <button onClick={this.createMatches}>
                Create Pairings
            </button>
        )}
        {matches.map(list => {
               return(
                 <div>{list[0]}, {list[1]}</div>
               );
                }
              )}
        {currentUser && currentUser.username === "Admin" && this.state.matches !== "" && (
            <button onClick={this.confirmMatches}>
                Confirm Matches
            </button>
        )}
      </div>
    );
  }
}
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class Desc extends Component 
{
    constructor(props) {
        super();
    
        this.state = {
          guess: undefined
        }; 

        this.superior = this.superior.bind(this);
        this.count = this.count.bind(this);
}
superior(){
  axios.get('http://localhost:4000/scores/superior/'+this.props.turn)
.then(res => {
   this.setState(() => ({superior : res.data}),this.count);
}) 
.catch(err => {console.log(err)})
}

count(){
  axios.get('http://localhost:4000/scores/count')
.then(res => {
   this.setState(() => ({count : res.data}),this.updateDiff);
}) 
.catch(err => {console.log(err)})
}

updateDiff(){

  const ratio = parseInt((this.state.superior) / parseInt(this.state.count)*100);
  this.setState(() => ({percent : ratio }));
}

componentDidMount()
{
  this.superior();

}

render() {
    return (
      <div className="game-text">
        <p>Hi {this.props.name}!</p>
          <p>Keberuntunganmu : </p>
           <p className="game-outcome">{this.props.title}</p>
        <p className="">{this.props.desc}</p>
        <p>Selamat! Anda lebih beruntung dari {this.state.superior} Orang, Keberuntungan anda diatas {this.state.percent}% orang ditempat ini! </p>
      </div>
    );
  }
    
}

    
export default Desc;
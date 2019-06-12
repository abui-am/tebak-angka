import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import generate from "@babel/generator";

class Desc extends Component 
{
    constructor(props) {
        super();
    
        this.state = {
          guess: undefined
        }; 
}

render() {
    return (
      <div className="">
          <p>Keberuntunganmu : </p>
           <p>{this.props.title}</p>
        <p className="">{this.props.desc}</p>
      </div>
    );
  }
    
}

    
export default Desc;
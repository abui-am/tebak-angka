import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import termo from "../images/termo.svg"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Desc extends Component {
  constructor(props) {
    super();

    this.state = {
      value: 1
    };
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue() {
    this.setState(() => ({ value: this.state.value + 1 }));
  }



  render() {
    return (
      <div className="">
        <center>

        
        <h1>Tutorial</h1>
        {this.state.value == 1 && (
          <div>
            <p>Didalam game ini anda akan disuruh menebak angka dalam jangkauan</p>
            <p className="game-outcome">1 - 100</p>
            <p>Tujuan dari game ini adalah berhasil menebak angka yang dipilih secara acak oleh sistem</p>
            <p>setiap kali anda memasukan angka, maka indikator thermometer akan berubah</p>
            <img src={termo}></img>
            
          </div>
        )}

{
    (this.state.value==2) &&
    (
        <button>
        <Link to="/" className="nav-link">Play Game</Link>    
        </button>
        
    )

}
{
  (this.state.value<2)&&
  (
<button
        className="btn btn-lg btn-success btn-block"
        onClick={this.changeValue}
      >
        NEXT
      </button>
    
  )
}
</center>
    
  </div>  
  );

  }
}

export default Desc;

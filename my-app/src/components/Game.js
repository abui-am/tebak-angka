import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/game.css";
import axios from "axios";

class Game extends Component {
  constructor(props) {
    super();

    this.state = {
      guess: undefined,
      difficulty: props.difficulty,
      answer: Math.floor(Math.random() * (+100 - +1)),
      min: 0,
      max: 100,
      maximum: 100,
      accuracy: 0,
      turns: 1,
      name: "",
      nameSubmited: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.guessNumber = this.guessNumber.bind(this);
    this.startGame = this.startGame.bind(this);
    this.onSubmitted = this.onSubmitted.bind(this);
    this.getRating = this.getRating.bind(this);
  }

  outcomeClass() {
    const indicator = this.state.indicator;

    if (!indicator || indicator === "terbakar") {
      return "indicator--red fa fa-thermometer-0 fa-2x";
    }

    else if (indicator === "mendidih") {
      return "indicator--orangered fa fa-thermometer-0 fa-2x";
    }

    if (indicator === "panas") {
      return "indicator--orange fa fa-thermometer-0 fa-2x";
    }

    if (indicator === "hangat") {
      return "indicator--yellow fa fa-thermometer-0 fa-2x";
    }

    if (indicator === "dingin") {
      return "indicator--green fa fa-thermometer-0 fa-2x";
    }

    if (indicator === "sangat dingin") {
      return "indicator--cyan fa fa-thermometer-0 fa-2x";
    }

    return "indicator--blue fa fa-thermometer-0 fa-2x";
  }

  handleNumberChange(e) {
    const guess = e.target.value;

    if (!isNaN(guess)) {
      this.setState(() => ({ guess: parseInt(guess) }));
    }
  }

  handleNameChange(e) {
    const names = e.target.value;
    this.setState(() => ({ name: names }));
  }

  componentDidMount() {}

  startGame() {
    this.setState(() => ({
      outcome: undefined,
      turns: 1,
      min: 0,
      max: 100,
      nameSubmited: false,
      answer: Math.floor(Math.random() * (+100 - +1))
    }));
  }

  getRating() {
    let ratings;
    const turn = this.state.turns;
    if (turn < 2) {
      ratings = "god";
    } else if (turn < 5) {
      ratings = "laksek";
    } else {
      ratings = "ampas";
    }

    this.setState(() => ({ rating: ratings }));
  }

  guessNumber() {
    this.getRating();
    const difference = Math.abs(
      parseInt(this.state.guess) - parseInt(this.state.answer)
    );
    const acc = difference / this.state.maximum;
    //alert(this.state.answer);
    let a = "membeku";
    if (acc <= 0.05) {
      a = "terbakar";
    }
    if (acc <= 0.1) {
        a = "mendidih";
      } 
      else if (acc <= 0.2) {
      a = "panas";
    } else if (acc <= 0.3) {
      a = "hangat";
    } else if (acc <= 0.4) {
      a = "dingin";
    } else if (acc <= 0.8) {
      a = "sangat dingin";
    }

    const diff = this.state.guess - this.state.answer;
    let oc,
      text,
      turn = parseInt(this.state.turns);
    let mins = this.state.min,
      maxs = this.state.max;
    if (diff < 0) {
      oc = "Lebih Besar";
      mins = this.state.guess;
    } else if (diff > 0) {
      oc = "Lebih Kecil";
      maxs = this.state.guess;
    } else {
      oc = "you win";
    }

    if (oc !== "you win") {
      text = oc + " : " + a;
      this.setState(() => ({
        outcome: text,
        min: mins,
        max: maxs,
        guess: "",
        accuracy: acc,
        indicator: a,
        turns: turn + 1
      }));
    } else {
      text = oc;
      this.setState(() => ({
        outcome: text,
        guess: ""
      }));
    }

    
  }

  onSubmitted(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`name: ${this.state.name}`);
    console.log(`turn: ${this.state.turn}`);
    console.log(`rating: ${this.state.rating}`);

    const newTodo = {
      name: this.state.name,
      turn: this.state.turns,
      rating: this.state.rating
    };

    axios
      .post("http://localhost:4000/scores/add", newTodo)
      .then(res => console.log(res.data));

    this.setState({
      name: undefined,
      rating: undefined,
      nameSubmited: true
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.outcome !== 'you win' && (
          <p className="turn">PERCOBAAN KE-{this.state.turns}
         </p>
        )}

        <div className="row">
          <div className="col-md-4 mx-auto">
            {this.state.outcome !== "you win" && (
              <div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control game-display"
                    placeholder="Masukan 1-100"
                    onChange={this.handleNumberChange}
                    value={this.state.guess}
                  />
                </div>
                
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-success btn-block"
                    onClick={this.guessNumber}
                  >
                    GUESS
                  </button>
                </div>
              </div>
            )}
            {this.state.outcome && this.state.outcome !== "you win" && (
              <div className="form-group">
                <div className="game-outcome">
                  
                  <p>{this.state.outcome}</p>
                  <div className='game-icon'>
                  <i className={`${this.outcomeClass()}`} />
                   </div>   
                   <div className="game-outcome">
                
                    </div>
                </div>
              </div>
            )}
            {this.state.outcome === "you win" &&
              this.state.nameSubmited === true && (
                <div className="form-group">
                  <div className="game-outcome">
                    <p>{this.state.outcome}</p>
                    <button
                      className="btn btn-lg btn-success btn-block"
                      onClick={this.startGame}
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                </div>
              )}

            {this.state.outcome === "you win" &&
              this.state.nameSubmited === false && (
                <div className="form-group">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control game-display"
                      placeholder="Your Name"
                      onChange={this.handleNameChange}
                      value={this.state.name}
                    />
                  </div>
                  <div className="game-outcome">
                    <p>{this.state.outcome}</p>
                    <button
                      className="btn btn-lg btn-success btn-block"
                      onClick={this.onSubmitted}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

Game.defaultProps = {
  guess: 0,
  magicNumber: undefined
};

Game.propTypes = {
  guess: PropTypes.number,
  magicNumber: PropTypes.number,
  difficulty: PropTypes.any
};

export default Game;

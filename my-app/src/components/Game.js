import React, { Component } from "react";
import "../style/game.css";
import axios from "axios";
import Desc from './Desc';

class Game extends Component {
  constructor(props) {
    super();

    this.state = {
      guess: undefined,
      difficulty: props.difficulty,
      answer: Math.floor((Math.random() * 100)  + 1),
      min: 0,
      max: 100,
      maximum: 100,
      accuracy: 0,
      turns: 1,
      name: "",
      nameSubmited: false,
      lasttry: "Masukan 1 s/d 100"
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.guessNumber = this.guessNumber.bind(this);
    this.startGame = this.startGame.bind(this);
    this.onSubmitted = this.onSubmitted.bind(this);
    this.getRating = this.getRating.bind(this);
    this.getIndicator = this.getIndicator.bind(this);
    this.getText = this.getText.bind(this);

  }

  outcomeClass() {
    const indicator = this.state.indicator;

    if (!indicator || indicator === "terbakar") {
      return "indicator--red fa fa-thermometer fa-2x";
    }

    else if (indicator === "mendidih") {
      return "indicator--orangered fa fa-thermometer fa-2x";
    }

    if (indicator === "panas") {
      return "indicator--orange fa fa-thermometer-half fa-2x";
    }

    if (indicator === "hangat") {
      return "indicator--yellow fa fa-thermometer-quarter fa-2x";
    }

    if (indicator === "dingin") {
      return "indicator--green fa fa-thermometer-empty fa-2x";
    }

    if (indicator === "sangat dingin") {
      return "indicator--cyan fa fa-thermometer-empty fa-2x";
    }

    return "indicator--blue fa fa-thermometer fa-2x";
  }

  Diff() {
    const ocs = this.state.outcome;
    if(ocs === "ANGKA TERLALU KECIL")
    {
      return "fa fa-angle-double-left";
    }
    else
    {
      return "fa fa-angle-double-right";
    }
  }
  handleNumberChange(e) {
    const guess = e.target.value;

    if (!isNaN(guess)) {
      this.setState(() => ({ guess: parseInt(guess) }));
    }
    else
    {
      this.setState(() => ({guess : 0}));
    }
  }

  handleNameChange(e) {
    const names = e.target.value;
    this.setState(() => ({ name: names }));
  }


  startGame() {
    this.setState(() => ({
      outcome: undefined,
      turns: 1,
      min: 0,
      max: 100,
      nameSubmited: false,
      answer: Math.floor((Math.random() * 100)  + 1),
      lasttry:"Masukan 1 s/d 100"
    }));


  }

  getRating() {
    let ratings,desc;
    const turn = this.state.turns;
    if (turn < 2) {
      ratings = "PENGGARAM";
      desc  = "Anda adalah orang yang sering menguji keberuntungan dan sukses dalamnya";
    } else if (turn < 4) {
      ratings = "LAKSEK";
      desc  = "Keberuntungan anda sedang dipuncak, hati hati dengan hukum Aksi = Reaksi";
    } else if (turn < 7) {
      ratings = "BERUNTUNG";
      desc  = "Anda sedang beruntung hari ini, mungkin anda bisa mendapatkan sesuatu yang bagus hari ini";
    } else if (turn < 10) {
      ratings = "LUMAYAN";
      desc  = "Anda cukup beruntung, untuk 1 kali ini saja kah ?? ";
    } else if (turn < 13) {
      ratings = "NORMAL";
      desc  = "Anda adalah orang normal. Mainstream. Tidak beruntung, tapi tidak sial";
    } else if (turn < 16) {
      ratings = "TIDAK BERUNTUNG";
      desc  = "Anda sedikit sial, mungkin setelah mencoba lagi akan berubah";
    }  else if (turn < 20) {
      ratings = "AMPAS";
      desc  = "Tak ada kata yang mendeskripsikan situasi anda selain ini, SIAL";
    }else {
      ratings = "BANYAK DOSA";
      desc  = "Bersihkan diri, sucikan hati. Mungkin takdirmu ini kan berganti.";
    }
    let p;

   
    if(this.state.lasttry==null)
    {
      p = this.state.guess;
    }
    {
       p = this.state.guess;
    }
    
    this.setState(() => ({ rating: ratings, lasttry : p, description : desc }),()=> {this.getIndicator()});
  }

  getIndicator() {
    const difference = Math.abs(
      parseInt(this.state.guess) - parseInt(this.state.answer)
    );
    const acc = difference / this.state.maximum;
    let a = "membeku";
    if (acc <= 0.05) {
      a = "terbakar";
    }
    else if (acc <= 0.1) {
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

    this.setState(() => ({
      accuracy: acc,
      indicator : a
    }),() => {this.getText()});
  }
  

  guessNumber() {
    const t = this.state.turns-1;
    if(this.state.guess=='')
    this.setState({'guess' : null, turns : t},this.getRating);
    else if (this.state.lasttry=='Masukan 1 s/d 100' && this.state.guess==null)
    this.setState({'guess' : null, turns : t},this.getRating);
    else
    this.getRating();
    
  }

  getText()
  {
    const diff = this.state.guess - this.state.answer;
    let oc,os,
      text,
      turn = parseInt(this.state.turns);
    let mins = this.state.min,
      maxs = this.state.max;
    if (diff < 0) {
      oc = "ANGKA TERLALU KECIL";
      os = "SALAH"
      mins = this.state.guess;
    } else if (diff > 0) {
      oc = "ANGKA TERLALU BESAR";
      os = "SALAH"

      maxs = this.state.guess;
    } else if(diff == 0) {
      oc = "kau menang";
    }

    if (oc !== "kau menang") {
      text =  oc ;
      this.setState(() => ({
        outcome: text,
        min: mins,
        max: maxs,
        guess: "",
        hasil: os,
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
      nameSubmited: true
    });
  }

  superior(){
    axios.get('http://localhost:4000/scores/superior/'+this.state.turns)
 .then(res => {
     this.setState(() => ({superior : res.data}));
 }) 
 .catch(err => {console.log(err)})
}


  render() {
    return (
      <div className="container">
        {this.state.outcome !== 'kau menang' && (
          <p className="turn">PERCOBAAN KE-{this.state.turns}
         </p>
        )}

        <div className="row">
          <div className="col-md-4 mx-auto">
            {this.state.outcome !== "kau menang" && (
              <div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control game-display"
                    placeholder={this.state.lasttry}
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
            {this.state.outcome && this.state.outcome !== "kau menang" && (
              <div className="form-group">
                <div className="game-outcome row">
                  <p className='game-hint'>Oops, tebakanmu belum benar</p>
                  <p className="game-hint col-sm-12">Hint : </p>
                  <div className="col-sm-6">
                  <div className='game-icon'>
                  <i className={`${this.outcomeClass()}`} />
                   </div>   
                   <div className="game-outcome">
                   <p>{this.state.indicator}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className='game-icon'>
                  <i className={`${this.Diff()}`} />
                   </div>   
                   <div className="game-outcome">
                   <p>{this.state.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.outcome === "kau menang" &&
              this.state.nameSubmited === true && (
                <div className="form-group">
                  <div className="game-outcome">
                    <Desc desc={this.state.description} title={this.state.rating} turn={this.state.turns} name={this.state.name}/>
                    <button
                      className="btn btn-lg btn-success btn-block"
                      onClick={this.startGame}
                    >
                      MAIN LAGI
                    </button>
                  </div>
                </div>
              )}

            {this.state.outcome === "kau menang" &&
              this.state.nameSubmited === false && (
                <div className="form-group">
                  <p>Tebakanmu benar, masukan namamu</p>
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
export default Game;

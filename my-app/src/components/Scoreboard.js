import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
const Score = props => (
    <tr>
        <td>{props.score.name}</td>
        <td>{props.score.turn}</td>
        <td>{props.score.rating}</td>
    </tr>
)

class Scoreboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {scores: []};
    }

    componentDidMount(){
        Axios.get('http://localhost:4000/scores/')
     .then(res => {
         this.setState(() => ({scores : res.data}));
     }) 
     .catch(err => {console.log(err)})
    }

    scoreList() {
        return this.state.scores.map(function(res, i){
            return <Score score={res} key={i} />;
        })
    }

  render() {
    return (
        <div>
        <h3>Ranking</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Percobaan</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                { this.scoreList() }
            </tbody>
        </table>
    </div>
    );
  }
}
    
    export default Scoreboard;
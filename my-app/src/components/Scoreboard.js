import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

const Score = props => (
    
    props.keys >= props.page - 1 * props.perpage && props.keys < props.page*props.perpage &&
    (
<tr keys={props.keys}>
        <td>{props.keys + 1}</td>
        <td>{props.score.name}</td>
        <td>{props.score.turn}</td>
        <td>{props.score.rating}</td>
    </tr>
    )
    )  

class Scoreboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            perpage : 10,
            page : 1
        };

        this.scoreList = this.scoreList.bind(this);

    }

    componentDidMount(){
        Axios.get('http://localhost:4000/scores/')
     .then(res => {
         this.setState(() => ({scores : res.data    }));
     }) 
     .catch(err => {console.log(err)})
    }

    

    scoreList() {
        return this.state.scores.map(function(res, i){
            return <Score score={res} keys={i} />;
        })
    }

  render() {
    return (
        <div>
        <h3>Ranking</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                    <th>No</th>
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
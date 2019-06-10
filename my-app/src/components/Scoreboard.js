import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

const Pagelist = props => (
    (
<button onClick={props.func}>
        {props.number}
</button>
    )

    )  

    const Score = props => (
        props.keys >= props.page &&  props.keys < props.page + 10 &&
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
            page : 2,
            perpage :10,
            pages :[1,2,3,4,5,6,7,8,9,10]
        };

        this.scoreList = this.scoreList.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    componentDidMount(){
        Axios.get('http://localhost:4000/scores/sort')
     .then(res => {
         this.setState(() => ({scores : res.data}));
     }) 
     .catch(err => {console.log(err)})
    }

    

    scoreList(a) {
        return this.state.scores.map(function(res,i){
            return <Score score={res} keys={i} page={(a-1)*10} />;
        })
    }
    

    setPage= a =>{
        this.setState({
            page : a 
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
                { this.scoreList(this.state.page) }
                {/* <Pagelist func={this.setPage(1)} number = {1}/>
                <Pagelist func={this.setPage(2)} number = {2}/> */}

            </tbody>
        </table>
    </div>
    );
  }
}
    
    export default Scoreboard;
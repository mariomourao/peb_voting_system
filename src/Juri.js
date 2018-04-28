import React, { Component } from 'react';
import logo from './logo-peb.png';
import axios from 'axios';
import Rating from 'react-rating';
import './rc.css'

import './App.css';

class Juri extends Component {
  
  state = {
    bands: [],
    ip: ""
  }
  
  componentDidMount(){
    axios.get(`http://localhost:8080/api/juri`)
    .then(res => {
      const bands = {
        1:{id: 1, stage: 'Médio Tejo', name: 'Siul Sotnas', rate: 0, voted: false, juri:true},
        2:{id: 2, stage: 'Coimbra', name: 'Raquel Ralha & Pedro Renato',rate: 0, voted: false, juri:true},
        3:{id: 3, stage: 'Médio Tejo', name: 'Coiote',rate: 0, voted: false, juri:true},
        4:{id: 4, stage: 'Médio Tejo', name: 'Os Zhéróis 2.1.', rate: 0, voted: false, juri:true}
      };
      
      res.data.map(({band,rate}) => {bands[band].rate = rate;bands[band].voted = true; return 0})
      this.setState({ bands:Object.values(bands) });
    }).catch(error => {
      console.log(error)
      alert("Erro a carregar a listagem das bandas!");
    });

    axios.get(`http://peb2018.pt:8080/api/ip`)
    .then(res => {
      this.setState({ ip:res.data });
    }).catch(error => {
      console.log(error)
    });
 
  }  
  
  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <p className="App-title">App juri</p>
        </header>
        <div className="Vertical-line"/>
        <Bands bands={this.state.bands} />
        <div className="Footer">
          <p className="Footer-text">*Aos votos do público, somam-se os votos de um júri nomeado pela organização, à razão de 50/50</p>
          <p className="Footer-text">Por decisão da organização, apenas as 4 bandas aqui apresentadas estão a concurso</p>
          <p className="Footer-text">Os resultados serão conhecidos no final da noite</p>
        </div>
        <div>
          <p className="Footer-cw">({this.state.ip})</p>
          <p className="Footer-cw">@2018 POR ESTAS BANDAS</p>
        </div>
      </div>
    );
  }
}



function Bands(props) {
  const content = props.bands.map((band) =>
    <div key={band.id}>
      <Band band={band}/>
      <div className="Vertical-line"/>
    </div>
  );

  return (
    <div>
      {content}
    </div>
  );
}


class Band extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rate: props.band.rate, voted: props.band.voted,juri: props.band.juri};
  }


  onChange(v) {
    console.log('selected star', v);
    this.setState({ rate: v });
  }

  vote(name,id) {
    console.log('vote', this.state.rate);
    axios.post(`http://localhost:8080/api/vote`, { 
      "band":id,
      "bandName":name,
      "rate":this.state.rate,
      "juri":this.state.juri
     })
    .then(res => {
      console.log(res);
      console.log(res.data);
      this.setState({ voted:true });
    }).catch(error => {
      console.log(error)
      alert("Já foi efetuado o voto para este banda!");
    });
    
  }

  render() {
    let bgColor = this.state.voted ?  "#77C4BA" :"#2C3673"
    let starColor = this.state.voted ?  "fa fa-star-o fa-2x light-blue-star" : "fa fa-star-o fa-2x blue-star" 
    let fullStarColor = this.state.voted ?  "fa fa-star fa-2x light-blue-star" : "fa fa-star fa-2x blue-star" 
    return (

      <div className='Row-band'  >
        <div className="Band-info" style={{border: "3px solid " + bgColor}}>
          <p className="Band-hour" style={{color: bgColor}}>{this.props.band.hour}</p>
          <p className="Band-stage" style={{backgroundColor: bgColor}}>PALCO</p>
          <p className="Band-stage" style={{backgroundColor: bgColor}}>{this.props.band.stage.toUpperCase()}</p>
          <p className="Band-name" style={{color: bgColor}}>{this.props.band.name}</p>
        </div>
        <div className="Vote-container">
          
            <p className="Vote-value" style={{color: bgColor}}>{this.state.rate}</p>
            <Rating
              emptySymbol={starColor}
              fullSymbol={fullStarColor}
              initialRating={this.state.rate}
              onChange={(v)=> this.onChange(v)}
              readonly={this.state.voted}
            />
            
            {this.state.voted ? (
              <p className="button-voted" style={{color: bgColor}} >(Já votaste)</p>
             ) : (
              <button className="button" style={{backgroundColor: bgColor}} disabled={this.state.voted} onClick={ () => {this.vote(this.props.band.name,this.props.band.id)} }>
                VOTAR
              </button>
             )
            }

            <div  className="space" />    
        </div> 
      </div>
    );
  }

}
export default Juri;

import Rate from 'rc-rate'
import React, { Component } from 'react';
import logo from './logo-peb.png';
import './rc.css'

import './App.css';

class App extends Component {

  
  render() {
    const bands = [
      {id: 1, hour: '22h00', stage: 'Médio Tejo', name: 'Siul Sotnas', rate: 2, voted: false},
      {id: 2, hour: '22h50', stage: 'Coimbra', name: 'Raquel Ralha & Pedro Renato',rate: 2, voted: false},
      {id: 3, hour: '22h40', stage: 'Médio Tejo', name: 'Coiote',rate: 2, voted: false},
      {id: 4, hour: '22h00', stage: 'Médio Tejo', name: 'Os Zhéróis 2.1.', rate: 2, voted: false},
      {id: 5, hour: '22h50', stage: 'Coimbra', name: 'Birds are Indie',rate: 2, voted: false},
      {id: 6, hour: '23h40', stage: 'Coimbra', name: 'BJ Rui Ferreira',rate: 2, voted: false}
    ];

    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <p className="App-text">Aqui podes pontuar as actuações desde 7º Festival Por Estas Bandas! A banda mais votada vai actuar no Festival BONS SONS'18.</p>
          <p className="App-title">Participa! A decisão é tua*</p>
        </header>
        <div className="Vertical-line"/>
        <Bands bands={bands} />
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
    this.state = {rate: props.band.rate, voted: props.band.voted};
  }


  onChange(v) {
    console.log('selected star', v);
    this.setState({ rate: v });
  }

  vote() {
    console.log('vote', this.state.rate);
    this.setState({ voted:true });
  }

  render() {
    return (

      <div className='Row-band'  >
        <div className="Band-info">
          <p className="Band-hour">{this.props.band.hour}</p>
          <p className="Band-stage">PALCO</p>
          <p className="Band-stage">{this.props.band.stage.toUpperCase()}</p>
          <p className="Band-name">{this.props.band.name}</p>
        </div>
        <div className="Vote-container">
          
            <p className="Vote-value">{this.state.rate}</p>
         
            <Rate
              defaultValue={this.state.rate}
              onChange={(v)=> this.onChange(v)}
              style={{ fontSize: 40 }}
              allowClear={false}
              disabled={this.state.voted}
            />

            {this.state.voted ? (
              <p className="button-voted" >(Já votou)</p>
             ) : (
              <button className="button" disabled={this.state.voted} onClick={ ()=>{this.vote()} }>
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
export default App;

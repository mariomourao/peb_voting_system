import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Rating from 'react-rating';
import './rc.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      ip: ""
    };
  }

  componentDidMount(){
    const bands = {
      1:{id: 1, stage: 'Aveiro', hour:'22h00', name: 'Siricaia', rate: 0, voted: false, juri:false},
      2:{id: 2, stage: 'Ribatejo', hour:'22h50', name: 'Célia Barroca e o Indifado',rate: 0, voted: false, juri:false},
      3:{id: 3, stage: 'Aveiro', hour:'23h40',name: 'Sharp Sharp',rate: 0, voted: false, juri:false},
      4:{id: 4, stage: 'Ribatejo', hour:'00h30',name: 'Ossos d\'Ouvido', rate: 0, voted: false, juri:false},
      5:{id: 5, stage: 'Aveiro', hour:'01h20',name: 'Cosmic Mass', rate: 0, voted: false, juri:false}
    };

    this.setState({ bands:Object.values(bands) });
  }


  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <p className="App-text">Aqui podes pontuar as atuações do 8º Festival Por Estas Bandas! A banda mais votada atua na Recepção ao Campista do Festival BONS SONS'19.</p>
          <p className="App-title">Participa! A decisão é tua*</p>
        </header>
        <Bands bands={this.state.bands} />
        <div className="Footer">
          <p>*Aos votos do público, somam-se os votos de um júri nomeado pela organização, à razão de 50/50</p>
          <p>Por decisão da organização, apenas as 5 bandas aqui apresentadas estão a concurso</p>
          <p>Os resultados serão conhecidos no final da noite</p>
        </div>
        <div>
          <p className="Footer-cw">({this.state.ip})</p>
          <p className="Footer-cw">©2019 POR ESTAS BANDAS</p>
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
    
  )

  return (
    <div className='Bansd'>
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

  vote(name,id) {
    console.log('vote', this.state.rate);
    if(this.state.rate === 0){
      alert("Atribuir a pontação primeiro através das estralas.")
    } else {
      /*
      axios.post(`http://peb2018.pt:8080/api/vote`, { 
        "band":id,
        "bandName":name,
        "rate":this.state.rate
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ voted:true });
      }).catch(error => {
        console.log(error)
        alert("Já foi efetuado o voto para este banda!");
      });
      */
    }
  }

  render() {
    let bgColor = this.state.voted ?  "#ECBD1A" :"#3A2973"
    let starColor = this.state.voted ?  "fa fa-star-o fa-2x light-blue-star" : "fa fa-star-o fa-2x blue-star" 
    let fullStarColor = this.state.voted ?  "fa fa-star fa-2x light-blue-star" : "fa fa-star fa-2x blue-star" 
    return (

      <div className='Row-band'  >
        <div className="Band-info" style={{border: "3px solid " + bgColor}}>
          <p className="Band-name" style={{backgroundColor: bgColor}}>{this.props.band.name}</p>
          <p className="Band-hour" style={{color: bgColor}}>{this.props.band.hour}</p>
          <p className="Band-stage" style={{color: bgColor}}>PALCO {this.props.band.stage.toUpperCase()}</p>
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
              <div className="button-container">
                <button className="button" style={{backgroundColor: bgColor}} disabled={this.state.voted} onClick={ () => {this.vote(this.props.band.name,this.props.band.id)} }>
                  VOTAR
                </button>
              </div>
             )
            }

            <div  className="space" />    
        </div> 
      </div>
    );
  }

}

export default App;

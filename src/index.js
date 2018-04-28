import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Juri from './Juri';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";


class Home extends Component {
    render() {
        return(
            <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/juri" component={Juri} />
            </div>
            </Router>
        )
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();

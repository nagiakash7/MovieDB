import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Mycomponents/Header';
import Body from './Mycomponents/Body';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import TestComponent from './Mycomponents/Test';
import Upcoming from './Mycomponents/Upcoming';
import Toprated from './Mycomponents/Toprated';
import MovieDetails from './Mycomponents/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/test" component={TestComponent} />
          <Route path="/home" component={Body} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/top-rated" component={Toprated} />
          <Route path="/movie-detail/:id" component={MovieDetails} />
          {/* Redirect from / to /home */}
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

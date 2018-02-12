import React from 'react';
import { Route } from 'react-router-dom';
import Home from '/components/home';

const App = () => (
  <main>
    <Route exact path="/" component={Home} />
  </main>
);

export default App;

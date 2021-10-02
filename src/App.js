// import React from 'react';
// import { AuthProvider } from './providers/AuthProvider';
// import './App.css';
// import './service/firebase';
// import Header from './components/Header';
// import Dashboard from './components/Dashboard';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <AuthProvider>
//       <Header />
//       <Dashboard />
//       <Footer />
//     </AuthProvider>
//   );
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Private from './components/Private';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar /><hr/>
            <Route exact path='/' component={Home}/>
            <Route path='/Footer' component={Footer}/>
            <Route path='/Dashboard' component={Dashboard}/>
            {/* <Route path='/Header' component={Header}/> */}
            <Route path='/Private' component={Private}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

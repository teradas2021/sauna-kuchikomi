import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return(
      <div>
        <Link to="/">Home</Link>
        <Link to="/Footer">Footer</Link>
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Header">Header</Link>
        <Link to="/Private">Private</Link>
      </div>
    )
  }
}

export default Navbar;
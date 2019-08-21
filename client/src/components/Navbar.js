import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">IPFS Memory Saver</span>
        <span className="navbar-text ml-auto" id="accountDisplay">{this.props.account}</span>
      </nav>
    );
  }
}

export default Navbar;

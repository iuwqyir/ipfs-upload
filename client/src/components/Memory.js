import React, { Component } from "react";

class Memory extends Component {
  getFormattedDate(timestamp) {
    let d = new Date(timestamp * 1000);
    return d.toGMTString();
  }

  render() {
    return (
      <div className="col-sm-4">
        <div className="card mb-3">
          <img src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p><small className="card-text">{this.getFormattedDate(this.props.date)}</small></p>
            <p className="card-text">{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Memory;

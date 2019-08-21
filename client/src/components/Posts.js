import React, { Component } from "react";

class Posts extends Component {
  render() {
    return (
      <div>
        <hr/>
        <h2 className="mt-3">Your Saved Memories</h2>
        <p>The images are stored on IPFS and your memories on the Ethereum Blockchain</p>
        <h4><span className="badge badge-warning">How cool is that!</span></h4>
        { this.props.ipfsHash
          ? <div className="container mt-5">
              <div className="row my-3">
                <div className="col-sm-4">
                  <div className="card mb-3">
                    <img src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} className="card-img-top" alt=""/>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card">
                    <img src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} className="card-img-top" alt=""/>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card">
                    <img src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} className="card-img-top" alt=""/>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>          
          : ''
        }
      </div>
    );
  }
}

export default Posts;

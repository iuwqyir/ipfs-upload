import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from './ipfs';
import Navbar from './Navbar';

import "./App.css";

class App extends Component {
  state = { account: null, contract: null, buffer: null, ipfsHash: '', loading: true };

  constructor(props) {
    super(props);
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set account and contract to the state, set loading to false and then fetch the image hash
      this.setState({ account, contract: instance, loading: false }, this.fetchIpfsHash);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load account or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async fetchIpfsHash() {
    const contract = this.state.contract;
    // Get the value from the contract
    const response = await contract.methods.get().call({ from: this.state.account });
    // Update state with the result.
    this.setState({ ipfsHash: response });
  };

  captureFile(event) {
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) });
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    ipfs.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.setState({ ipfsHash: result[0].hash });
      this.state.contract.methods.set(result[0].hash).send(
        { from: this.state.account }, () => {
          this.setState({ loading: false });
        }
      );
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <Navbar account={this.state.account} />
        <h1>Your Image</h1>
        <p>This image is stored on IPFS and the Ethereum Blockchain</p>
        { this.state.ipfsHash
          ? <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
          : ''
        }
        <h2>Upload Image</h2>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import MemorySaver from "./contracts/MemorySaver.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from './ipfs';
import Navbar from './components/Navbar';
import Form from './components/Form';
import MemoryRow from './components/MemoryRow';
import Memory from './components/Memory';
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: null, 
      contract: null, 
      memories: [], 
      memoryCount: 0, 
      loading: true
    };
    this.saveMemory = this.saveMemory.bind(this);
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
      const deployedNetwork = MemorySaver.networks[networkId];
      const instance = new web3.eth.Contract(
        MemorySaver.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ account, contract: instance}, this.fetchMemories);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load account or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async fetchMemories() {
    this.setState({ loading: true });
    const memoryCount = await this.state.contract.methods.getMemoryCount().call({ from: this.state.account });
    let memoryRows = [];
    let memories = [];
    for (var i = 0; i < memoryCount; i++) {
      const mem = await this.state.contract.methods.getMemory(i).call({ from: this.state.account });
      memories.push(<Memory key={i} title={mem[0]} content={mem[1]} ipfsHash={mem[2]} date={mem[3]}/>);
      if (i % 3 === 2) {
        memoryRows.push(<MemoryRow memories={memories} key={i}/>);
        memories = [];
      }
    }
    if (memories.length > 0) {
      memoryRows.push(<MemoryRow key={i} memories={memories} />)
    }
    this.setState({ memories: memoryRows, memoryCount, loading: false });
  };

  saveMemory(title, content, buffer) {
    this.setState({ loading: true });
    ipfs.add(buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.state.contract.methods.save(title, content, result[0].hash)
        .send({ from: this.state.account }, () => {
          this.fetchMemories();
          this.setState({ loading: false });
        });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <Navbar account={this.state.account} />
        <Form saveMemory={this.saveMemory} />
        <hr/>
        <h2 className="mt-3">Your Saved Memories</h2>
        <p>The images are stored on IPFS and your memories on the Ethereum Blockchain. How cool is that?</p>
        <h5>You currently have <span className="badge badge-warning">{this.state.memoryCount}</span> memories saved!</h5>
        <div className="container mt-5">
          {this.state.memories}
        </div>
      </div>
    );
  }
}

export default App;

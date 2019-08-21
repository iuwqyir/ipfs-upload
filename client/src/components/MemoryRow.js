import React, { Component } from "react";

class MemoryRow extends Component {
  render() {
    return (
      <div className="row my-3">{this.props.memories}</div>
    );
  }
}

export default MemoryRow;

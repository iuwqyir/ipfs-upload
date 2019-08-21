import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      fileInputLabel: ''
    };
    this.captureFile = this.captureFile.bind(this);
  }

  captureFile(event) {
    const fileName = event.target.files[0].name;
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ 
        buffer: Buffer.from(reader.result),
        fileInputLabel: fileName
      });
    };
  }

  render() {
    return (
      <div className="submit-form text-center col-4 offset-4 my-3">
        <h2>Save A Memory</h2>
        <form className="form-horizontal justify-content-center" onSubmit={(event) => {
          event.preventDefault();
          this.props.saveMemory(this.memoryTitle.value, this.memoryContent.value, this.state.buffer);
          //this.setState({ memoryTitle: '', memoryContent: '', fileInputLabel: '' })
        }}>
          <div className="form-group form-group-sm">
            <input 
              type="text"
              className="form-control"
              ref={(input)=> this.memoryTitle = input}
              name="title"
              id="newPostTitle"
              placeholder="Title"
              required/>
          </div>
          <div className="form-group form-group-sm">
            <textarea 
              className="form-control"
              ref={(input)=> this.memoryContent = input}
              name="content"
              id="newPostContent"
              rows="3"
              placeholder="No more than 140 characters..."
              maxLength="140"
              required>
            </textarea>
          </div>
          <div className="custom-file">
            <input 
              type="file"
              className="custom-file-input input-sm"
              id="newPostImage"
              required
              onChange={this.captureFile} />
            <label className="custom-file-label" htmlFor="newPostImage">
              { this.state.fileInputLabel ? this.state.fileInputLabel : "Choose File"}
            </label>
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3 mb-3">Post</button>
        </form>
      </div>
    );
  }
}

export default Form;

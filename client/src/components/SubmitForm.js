import React, { Component } from "react";

class SubmitForm extends Component {
  render() {
    return (
      <div className="submit-form text-center col-4 offset-4 mt-3 mb-3">
        <h2>Upload A Post</h2>
        <form className="form-horizontal justify-content-center" onSubmit={this.onSubmit}>
          <div className="form-group form-group-sm">
            <input 
              type="text" 
              className="form-control" 
              name="title" 
              id="newPostTitle" 
              placeholder="Post Title" 
              required/>
          </div>
          <div className="form-group form-group-sm">
            <textarea 
              className="form-control" 
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
            <label className="custom-file-label" htmlFor="newPostImage">Choose File</label>
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3 mb-3">Post</button>
        </form>
      </div>
    );
  }
}

export default SubmitForm;

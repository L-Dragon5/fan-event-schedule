import React, { Component } from "react";
import ReactDOM from "react-dom";

class AdminMain extends Component {
  render() {
    return (
      <div>
        <h3>Admin Page</h3>
      </div>
    );
  }
}

export default AdminMain;

if (document.getElementById("admin-root")) {
  ReactDOM.render(<AdminMain />, document.getElementById("admin-root"));
}

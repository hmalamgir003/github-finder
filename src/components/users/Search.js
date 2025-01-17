import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = { text: "" };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something...", "light");
    } else {
      this.props.searchUsers(this.state.text);

      this.setState({ text: "" });
    }
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="search..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input type="submit" className="btn btn-block btn-dark" />
        </form>

        {this.props.showClearButton && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;

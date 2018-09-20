// The basics
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// Action creators and helpers
import { isServer } from '../store';

import Header from './header';
import Routes from './routes';

import './app.css';

class App extends Component {
  componentWillMount() {
    if (!isServer) {

    }
  }

  constructor (props) {
    super(props)


    this.state = {connected: false}
  }


  handlePasswordChange (event) {
    this.password = event.target.value
  }

  onSubmit () {
    if (this.password && this.password === "Epitech42"){
      this.setState(() => ({connected: true}))
    }
  }

  render() {


    if (!this.state.connected){
      return (
        <div>
          <input onChange={(event) => {this.handlePasswordChange(event)}} type="password"/>
          <input onClick={() => {this.onSubmit()}} type="submit"/>
        </div>
      )
    }


    return (
      <div id="app">
        <Header
          current={this.props.location.pathname}
        />
        <div id="content">
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({  }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

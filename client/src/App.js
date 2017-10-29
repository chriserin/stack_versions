import React, { Component } from 'react';
import glam from 'glamorous';

const AppCntnr = glam.div({
  backgroundColor: '#c3c3c3'
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      versionData: []
    }
  }

  componentDidMount() {
    fetch('/api/versions').then(
      results => {
        return results.json()
    }).then(data => this.setState({versionData: data}));
  }

  render() {
    let versions = [];
    if (this.state.versionData) {
      versions = this.state.versionData.map((version) => (
        <div>
          <span>{ version.name }</span>
          <span>—</span>
          <span>{ version.version }</span>
        </div>
      ));
    }

    return (
      <AppCntnr>
        { versions }
      </AppCntnr>
    );
  }
}

export default App;

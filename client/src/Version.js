import React, { Component } from 'react';
import glam from 'glamorous';
import moment from 'moment';

const VersionContainer = glam.div({
  width: '40%',
  margin: '0 auto',
  backgroundColor: 'white',
});

const InfoSpan = glam.span({
  backgroundColor: 'none',
  width: '20%',
  margin: '0 1rem',
  padding: '0 1rem',
  display: 'inline-block',
  boxSizing: 'borderBox'
});

const LeftInfo = glam(InfoSpan)({
  textAlign: 'right'
});

const RightInfo = glam(InfoSpan)({
  textAlign: 'left'
});

class Version extends Component {
  render() {
    return (
      <VersionContainer>
        <RightInfo>{moment(this.props.data.tagged_at).format('D')}</RightInfo>
        <LeftInfo>{this.props.data.name}</LeftInfo>
        <span>—</span>
        <RightInfo>{this.props.data.version}</RightInfo>
      </VersionContainer>
   );
  }
}

export default Version;

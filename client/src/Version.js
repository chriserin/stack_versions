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
  boxSizing: 'borderBox',
  fontFamily: 'sans-serif'
});

const LeftInfo = glam(InfoSpan)({
  textAlign: 'right'
});

const RightInfo = glam(InfoSpan)({
  textAlign: 'left',
  whiteSpace: 'nowrap'
});

const SvgContainer = glam.div({
  display: 'inline-block',
  height: '4rem',
  verticalAlign: 'middle',
  overflow: 'hidden',
});

const SVG = glam.svg({
  position: 'relative',
  height: '120%',
  width: '20px'
});

const Software = glam.div({
  display: 'inline-block',
  fontFamily: 'sans-serif',
  fontSize: '2rem',
  paddingRight: '.5rem'
});

const Versions = glam.div({
  display: 'inline-block',
  fontFamily: 'sans-serif',
  fontSize: '1rem',
  color: 'grey'
});


class Version extends Component {
  render() {
    return (
      <VersionContainer>
        <LeftInfo>{moment(this.props.date).format('D')}</LeftInfo>
          <SvgContainer>
              <SVG>
                <path d="M 0 0 L 0 200" stroke="black" fill="none" stroke-width="1"/>
              </SVG>
          </SvgContainer>
          <RightInfo>
            <Software>{this.props.software}</Software>
            <Versions>{this.props.versions.join(", ")}</Versions>
          </RightInfo>
      </VersionContainer>
   );
  }
}

export default Version;

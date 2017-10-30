import React, { Component } from 'react';
import Version from './Version';
import Filler from './DateFiller';
import glam from 'glamorous';

class DateRow extends Component {
  render() {

    const versions = this.props.data.map((version) => {
      if (version.tagged_at)
        return <Version data={version}></Version>;
      else
        return <Filler date={version}></Filler>;
    });

    return (
     <div className="DateRow">
       { versions }
     </div>
   );
  }
}

export default DateRow;

import React, { Component } from 'react';
import Version from './Version';
import Filler from './DateFiller';
import glam from 'glamorous';
import { groupBy, filter, map, sortBy, reverse } from 'lodash';

class DateRow extends Component {
  render() {
    const items = this.props.data;
    const groupedItems = groupBy(items, (item) => item.name);

    const fillerData = groupedItems[undefined];

    const versions = map(groupedItems, (v, k) => {
      if (v[0].tagged_at)
        return <Version date={v[0].tagged_at} software={k} versions={v.map((item) => item.version)} />;
    }).filter(Boolean)

    return (
     <div className="DateRow">
       <Filler date={fillerData[0]}></Filler>
       { versions }
     </div>
   );
  }
}

export default DateRow;

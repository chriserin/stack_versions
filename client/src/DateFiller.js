import React, { Component } from 'react';
import glam from 'glamorous';
import moment from 'moment';
import { cloneDeep } from 'lodash';

const Filler = glam.div({
  backgroundColor: 'none',
  height: '4px',
  margin: '0 auto',
});

const MonthLabel = glam.div({
  backgroundColor: '#b3b3b3',
  height: '20px',
  margin: '0 auto',
  width: '40%',
});

class DateFiller extends Component {

  render() {
    let filler = null;
    let date = moment(this.props.date);
    let endDate = cloneDeep(date).endOf('month');

    if (date.diff(endDate, 'days') === 0) {
      filler = (
        <MonthLabel>{date.format('MMMM')}</MonthLabel>
      );
    } else {
      filler = (
        <Filler></Filler>
      );
    }

    return (
      <span>
        {filler}
      </span>
   );
  }
}

export default DateFiller;

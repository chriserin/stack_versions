import React, { Component } from 'react';
import glam from 'glamorous';
import moment from 'moment';
import { cloneDeep } from 'lodash';

const Filler = glam.div({
  backgroundColor: 'none',
  height: '0px',
  margin: '0 auto',
});

const MonthLabel = glam.div({
  backgroundColor: '#e5e5e5',
  padding: '0.3rem',
  margin: '0 auto',
  width: '40%',
  fontFamily: 'Helvetica',
  fontSize: '1.9rem',
});

const DateFiller = ({date}) =>  {
  let filler = null;
  let mDate = moment(date);
  let endDate = cloneDeep(mDate).endOf('month');

  if (mDate.diff(endDate, 'days') === 0) {
    filler = (
      <MonthLabel>{mDate.format('MMMM YYYY')}</MonthLabel>
    );
  }
  return (
    <span>
    {filler}
    </span>
  );
}

export default DateFiller;

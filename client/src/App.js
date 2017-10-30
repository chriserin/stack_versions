import React, { Component } from 'react';
import glam from 'glamorous';
import DateFiller from './DateFiller';
import DateRow from './DateRow';
import moment from 'moment';
import dateArray from 'moment-array-dates';
import { first, last, groupBy, mapValues } from 'lodash';

const AppCntnr = glam.div({
  backgroundColor: 'none',
  margin: '0 auto',
  width: '100%',
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
    }).then(data => {
      const allDates = dateArray.range(
        last(data).tagged_at,
        moment(first(data).tagged_at).endOf('month')
      );

      const compareFn = (a, b) => {
        const momentA = moment(a.tagged_at || a);
        const momentB = moment(b.tagged_at || b);

        if (momentA.isAfter(momentB, 'day')) {
          return -1;
        } else if (momentA.isBefore(momentB, 'day')) {
          return 1;
        } else {
          if (a.taggedAt) {
            return -1;
          } else {
            return 0;
          }
        }

        return 0;
      };

      const everything = allDates.concat(data);
      everything.sort(compareFn);
      this.setState({versionData: groupBy(everything, (version) => {
          return moment(version.tagged_at || version).startOf('day').format();
        })
      });
    });
  }

  render() {
    let allVersions = [];

    if (this.state.versionData) {
      allVersions = Object.entries(this.state.versionData).map((groupedObject) => {
        let [date, versions] = groupedObject;

        return <DateRow date={date} data={[].concat(versions)}></DateRow>
      });
    }

    return (
      <AppCntnr>
        { allVersions }
      </AppCntnr>
    );
  }
}

export default App;

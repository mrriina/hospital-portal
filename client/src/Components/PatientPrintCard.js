import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import '../App.css';

class PrintCard extends Component {
  render() {
    const { doctorSpeciality, doctorName, doctorSurname, doctorPatronymic, date, time, doctorCabinet } = this.props;

    return (
        <div className="col">
          <Card style={{ width: '15rem', border: '1px solid gray', padding: '10px'}} className='indent'>
            <Card.Body>
              <div className="card-header" style={{textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationColor: 'gray', textDecorationThickness: '1px'}}>{doctorSpeciality}</div>
              <Card.Text>
                <div>Doctor: {doctorName} {doctorSurname} {doctorPatronymic}</div>
                <div>Date: {date.toString().slice(0,10)}</div>
                <div>Time: {time}</div>
                <div>Cabinet: {doctorCabinet}</div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
}

export default PrintCard;
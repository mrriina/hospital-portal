import React from 'react';
import Axios from 'axios';

import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

class TicketsCards extends React.Component {
    constructor(props) {
        super();
        this.username = props.username;
        
        this.state = {
            tickets: null
        };    
    }

    deleteTicket = (idtickets) => {
        Axios.post("http://localhost:3001/deleteUsersTicket", {
            idtickets: idtickets,
        }).then((response) => {
           this.componentDidMount();
        });
     };    

    componentDidMount() {
        Axios.post("http://localhost:3001/outputTickets", {
                username: this.username,
            }).then((response) => {
                this.setState({
                    tickets: response.data.map(item => {
                      return (
                        <div class="col">
                        <Card style={{ width: '18rem' }} className='indent'>
                            <Card.Body>
                                <div class="card-header text-uppercase">{item.doctorSpeciality}</div>
                                <Card.Text>
                                    <tr>Doctor: {item.doctorName} {item.doctorSurname} {item.doctorPatronymic}</tr>
                                    <tr>Date: {item.date}</tr>
                                    <tr>Time: {item.time}</tr>
                                    <tr>Cabinet: {item.doctorCabinet}</tr>
                                </Card.Text>
                                <Button variant="btn btn-danger" onClick={(e)=> {this.deleteTicket(item.idtickets)}}>Delete</Button>
                            </Card.Body>
                        </Card>
                        </div>
                      );
                    })
                  });
            });
      }
    
    render() {
        if (!this.state.tickets) {
            return null;
          } else {
            return (
                <div className='row row-cols-1 row-cols-md-4 g-4'>
                    {this.state.tickets}
                </div>
            );
          }
    }
}

export default TicketsCards;
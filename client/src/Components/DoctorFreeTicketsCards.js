import React from 'react';
import Axios from 'axios';

import '../App.css';
import { Card } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';

class DoctorFreeTicketsCards extends React.Component {
    constructor(props) {
        super();
        this.username = props.username;
        this.date = props.date;

        this.state = {
            tickets: null
        };    
    }

    componentDidMount() {
      Axios.post("http://localhost:3001/doctorOutputFreeTickets", {
              username: this.username,
              date: this.date,
          }).then((response) => {
              this.setState({
                  tickets: response.data.map(item => {
                      return (
                        <div class="col mb-3">
                        <Card style={{ width: '16rem' }} className='indent' onDoubleClick={() => this.handleShow(item)}>
                            <Card.Body>
                                <div class="card-header text-uppercase">TIME: {item.time}</div>
                                <Card.Text>
                                    <tr>Patient: - </tr>
                                </Card.Text>
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

export default DoctorFreeTicketsCards;
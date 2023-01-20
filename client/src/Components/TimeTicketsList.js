import React from 'react';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';

class TimeTicketsList extends React.Component {
    constructor(props) {
        super();
        this.doctor = props.doctor;
        this.date = props.date;
        
        this.state = {
            time: null
        };    
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getTimeTickets", {
            doctor: this.doctor,
            date: this.date,
            }).then((response) => {
                this.setState({
                    time: response.data.map(item => {
                      return (
                        <option value={item.time}>{item.time}</option>
                      );
                    })
                  });
            });
      }
    
    render() {
        if (!this.state.time) {
            return null;
          } else {
            return (
                <Form.Select aria-label="Default select example" onChange={(e)=>{this.props.func(e.target.value);}}>
                    <option>choose..</option>
                    {this.state.time}
                </Form.Select>
            );
          }
    }
}

export default TimeTicketsList;
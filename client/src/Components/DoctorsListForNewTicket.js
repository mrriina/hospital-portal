import React from 'react';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';

class DoctorsListForNewTicket extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            doctors: null
        };   
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getDoctorsAdminHome", {
            }).then((response) => {
                console.log('response= '+JSON.stringify(response));
                this.setState({
                    doctors: response.data.map(item => {
                      return (
                        <option value={item.iddoctor}>{item.name} {item.surname} {item.patronymic}</option>
                      );
                    })
                  });
            });
      }
    
    render() {
        if (!this.state.doctors) {
            return null;
          } else {
            return (
                <Form.Select aria-label="Default select example" onChange={(e)=>{this.props.func(e.target.value);}}>
                    <option>choose..</option>
                    {this.state.doctors}
                </Form.Select>
            );
          }
    }
}

export default DoctorsListForNewTicket;
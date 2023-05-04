import React from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class DoctorPatientAccountingComponent extends React.Component {
    constructor(props) {
        super();
        this.iddoctor = props.iddoctor;
        console.log('iddoctor=='+this.iddoctor);
        
        this.state = {
            patients: null
        };   
    }

    deletePatientFromAccounting = (accountingid) => {
        Axios.post("http://localhost:3001/doctorDeletePatientAccounting", {
            idaccounting: accountingid,
        }).then((response) => {
            this.componentDidMount();
        });
     };


    componentDidMount() {
        Axios.post("http://localhost:3001/doctorGetPatientAccounting", {
                iddoctor: this.iddoctor,
            }).then((response) => {
                this.setState({
                    patients: response.data.map(item => {
                      return (
                        <tr>
                            <td>{item.surname}</td>
                            <td>{item.name}</td>
                            <td>{item.patronymic}</td>
                            <td>{item.age}</td>
                            <td>{item.sex}</td>
                            <td>{item.address}</td>  
                            <td>{item.phone}</td>
                            <Button variant="btn btn-outline-danger" onClick={(e)=> {this.deletePatientFromAccounting(item.id);}}>Delete</Button>
                        </tr>
                      );
                    })
                  });
            });
      }
    
    render() {
        if (!this.state.patients) {
            return null;
          } else {
            return (
                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Surname</th>
                                <th scope="col">Name</th>
                                <th scope="col">Patronymic</th>
                                <th scope="col">Age</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.patients}</tbody>
                    </table>
                </div>
            );
          }
    }
}

export default DoctorPatientAccountingComponent;
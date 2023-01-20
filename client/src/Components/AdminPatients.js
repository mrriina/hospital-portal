import React from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class AdminPatients extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            patients: null,
            openModal : false
        };   
        this.name = '';
        this.surname = '';
        this.patronymic = '';
        this.age = '';
        this.sex = '';
        this.address = '';
        this.phone = '';
        this.usern = '';
    }

    editPatient = () => {
        Axios.post("http://localhost:3001/updateInfPatient", {
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            age: this.age,
            sex: this.sex,
            address: this.address,
            phone: this.phone,
            username: this.usern,
        }).then((response) => {
            this.onCloseModal();
            this.componentDidMount();
        });
     };

    deletePatient = (idpatient) => {
        Axios.post("http://localhost:3001/deletePatientAdminHome", {
            patient: idpatient,
        }).then((response) => {
            this.componentDidMount();
        });
     };

    deleteUserPatient = (username) => {
        Axios.post("http://localhost:3001/deleteUserPatientAdminHome", {
            username: username,
        }).then((response) => {
            this.componentDidMount();
        });
    };

    changeTicketPatient = (username) => {
        Axios.post("http://localhost:3001/changeTicketPatientAdminHome", {
            username: username,
        }).then((response) => {
           this.componentDidMount();
        });
    };

    editModal = (item) =>{
        this.setState({openModal : true})

        this.name = item.name;
        this.surname = item.surname;
        this.patronymic = item.patronymic;
        this.age = item.age;
        this.sex = item.sex;
        this.address = item.address;
        this.phone = item.phone;
        this.usern = item.usern;
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getPatientsAdminHome", {
            }).then((response) => {
                this.setState({
                    patients: response.data.map(item => {
                      return (
                        <tr onDoubleClick={()=>{this.editModal(item)}}>
                            <th scope="row">{item.idpatient}</th>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.patronymic}</td>
                            <td>{item.age}</td>
                            <td>{item.sex}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{item.usern}</td>
                            <td>{item.password}</td>
                            <Button variant="btn btn-outline-danger" onClick={(e)=> {this.deletePatient(item.idpatient); this.deleteUserPatient(item.usern); this.changeTicketPatient(item.usern);}}>Delete</Button>
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
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Surname</th>
                              <th scope="col">Patronymic</th>
                              <th scope="col">Age</th>
                              <th scope="col">Sex</th>
                              <th scope="col">Address</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Username</th>
                              <th scope="col">Password</th>
                          </tr>
                      </thead>
                      <tbody>{this.state.patients}</tbody>
                    </table>

                    <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                        <Container id="main-container" className="d-grid h-100">
                            <Form id="sign-in-form" className="text-center p-3 w-100">
                                <h1 className="mb-3 fs-3 fw-normal">Edit patient:</h1>
                                <Form.Group>
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Name" 
                                                autoComplete="name" 
                                                onChange={(e) => {
                                                        this.name = e.target.value;
                                                    }} 
                                                className="position-relative" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Surname" 
                                                autoComplete="surname" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.surname = e.target.value;
                                                }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Patronymic" 
                                                autoComplete="patronymic" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.patronymic = e.target.value;
                                                }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Age" 
                                                autoComplete="age" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.age = e.target.value;
                                                }} />
                                </Form.Group>
                                <div>
                                    <div class="form-check">
                                            <input
                                                type="radio"
                                                class="form-check-input"
                                                onChange={()=>{this.sex = "male"}}
                                                value="male"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"/>
                                            <label class="form-check-label" for="flexRadioDefault1">Male</label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                type="radio"
                                                class="form-check-input"
                                                onChange={()=>{this.sex = "female"}}
                                                value="female"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"/>
                                            <label class="form-check-label" for="flexRadioDefault2">Female</label>
                                        </div>
                                    </div>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Address" 
                                                autoComplete="address" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.address = e.target.value;;
                                                }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Phone" 
                                                autoComplete="phone" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.phone = e.target.value;
                                                }} />
                                </Form.Group>
                                
                                <div className="d-grid">
                                    <Button variant="primary" onClick={this.editPatient} size="lg">Apply</Button>
                                </div>
                            </Form>
                        </Container> 
                        </Modal>
                    </div>
                  );
          }
    }
}

export default AdminPatients;
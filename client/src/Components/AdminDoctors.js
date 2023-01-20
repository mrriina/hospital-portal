import React from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class AdminDoctors extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            doctors: null,
            openModal: false,
            openModalNewDoctor: false
        };   

        this.name = '';
        this.surname = '';
        this.patronymic = '';
        this.speciality = '';
        this.cabinet = '';
        this.usern = '';
        this.password = '';
    }

    deleteDoctor = (iddoctor) => {
        Axios.post("http://localhost:3001/deleteDoctorAdminHome", {
            doctor: iddoctor,
        }).then((response) => {
            this.componentDidMount();
        });
     };

     deleteUserDoctor = (username) => {
        Axios.post("http://localhost:3001/deleteUserDoctorAdminHome", {
            username: username,
        }).then((response) => {
            this.componentDidMount();
        });
     };

     deleteTicketDoctor = (iddoctor) => {
        Axios.post("http://localhost:3001/deleteTicketDoctorAdminHome", {
            iddoctor: iddoctor,
        }).then((response) => {
            this.componentDidMount();
        });
     };

     newDoctor = () => {
        Axios.post("http://localhost:3001/register", {
            username: this.usern,
            password: this.password,
            role: 'doctor',
        }).then((response) => {});

        Axios.post("http://localhost:3001/newDoctor", {
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            speciality: this.speciality,
            cabinet: this.cabinet,
            username: this.usern,
        }).then((response) => {
            this.onCloseNewDoctorModal();
            this.componentDidMount();
        });
     };

     newDoctorModal = () =>{
        this.setState({openModalNewDoctor : true});
    }

    onCloseNewDoctorModal = ()=>{
        this.setState({openModalNewDoctor : false})
    }

     editDoctor = () => {
        Axios.post("http://localhost:3001/updateInfDoctor", {
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            speciality: this.speciality,
            cabinet: this.cabinet,
            username: this.usern,
        }).then((response) => {
            this.onCloseEditModal();
            this.componentDidMount();
        });
     };

     editModal = (item) =>{
        this.setState({openModal : true});

        this.name = item.name;
        this.surname = item.surname;
        this.patronymic = item.patronymic;
        this.speciality = item.speciality;
        this.cabinet = item.cabinet;
        this.usern = item.usern;
    }

    onCloseEditModal = ()=>{
        this.setState({openModal : false})
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getDoctorsAdminHome", {
            }).then((response) => {
                this.setState({
                    doctors: response.data.map(item => {
                      return (
                        <tr onDoubleClick={()=>{this.editModal(item)}}>
                            <th scope="row">{item.iddoctor}</th>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.patronymic}</td>
                            <td>{item.speciality}</td>
                            <td>{item.cabinet}</td>
                            <td>{item.usern}</td>  
                            <td>{item.password}</td>
                            <Button variant="btn btn-outline-danger" onClick={(e)=> {this.deleteDoctor(item.iddoctor); this.deleteUserDoctor(item.usern); this.deleteTicketDoctor(item.iddoctor);}}>Delete</Button>
                        </tr>
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
                <div>
                    <Button variant="btn btn-outline-secondary" onClick={(e)=> {this.newDoctorModal()}}>New Doctor</Button>

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Patronymic</th>
                                <th scope="col">Speciality</th>
                                <th scope="col">Cabinet</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.doctors}</tbody>
                    </table>


{/*------------------------------------------- edit modal ---------------------------------------------*/}

                    <Modal open={this.state.openModal} onClose={this.onCloseEditModal}>
                        <Container id="main-container" className="d-grid h-100">
                            <Form id="sign-in-form" className="text-center p-3 w-100">
                                <h1 className="mb-3 fs-3 fw-normal">Edit doctor:</h1>
                                <Form.Group className="mb-3">
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
                                    <Form.Select aria-label="Default select example" onChange={(e)=>{this.speciality = e.target.value}}>
                                        <option>choose..</option>
                                        <option value='therapist'>therapist</option>
                                        <option value='pediatrician'>pediatrician</option>
                                        <option value='surgeon'>surgeon</option>
                                        <option value='psychiatrist'>psychiatrist</option>
                                        <option value='ophthalmologist'>ophthalmologist</option>
                                        <option value='otolaryngologist'>otolaryngologist</option>
                                        <option value='dentist'>dentist</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Cabinet" 
                                                autoComplete="cabinet" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.cabinet = e.target.value;;
                                                }} />
                                </Form.Group>
                                
                                <div className="d-grid">
                                    <Button variant="primary" onClick={this.editDoctor} size="lg">Apply</Button>
                                </div>
                            </Form>
                        </Container> 
                        </Modal>
{/*---------------------------------------------------------------------------------------------------------*/}


{/*------------------------------------------- new doctor modal ---------------------------------------------*/}

                    <Modal open={this.state.openModalNewDoctor} onClose={this.onCloseNewDoctorModal}>
                        <Container id="main-container" className="d-grid h-100">
                            <Form id="sign-in-form" className="text-center p-3 w-100">
                                <h1 className="mb-3 fs-3 fw-normal">New doctor:</h1>
                                <Form.Group className="mb-3">
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
                                    <Form.Select aria-label="Default select example" size="lg" onChange={(e)=>{this.speciality = e.target.value}}>
                                        <option>choose..</option>
                                        <option value='therapist'>therapist</option>
                                        <option value='pediatrician'>pediatrician</option>
                                        <option value='surgeon'>surgeon</option>
                                        <option value='psychiatrist'>psychiatrist</option>
                                        <option value='ophthalmologist'>ophthalmologist</option>
                                        <option value='otolaryngologist'>otolaryngologist</option>
                                        <option value='dentist'>dentist</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Cabinet" 
                                                autoComplete="cabinet" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.cabinet = e.target.value;;
                                                }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Username" 
                                                autoComplete="username" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.usern = e.target.value;;
                                                }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" 
                                                size="lg" 
                                                placeholder="Password" 
                                                autoComplete="password" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.password = e.target.value;;
                                                }} />
                                </Form.Group>
                                
                                <div className="d-grid">
                                    <Button variant="primary" onClick={this.newDoctor} size="lg">Create</Button>
                                </div>
                            </Form>
                        </Container> 
                        </Modal>
{/*----------------------------------------------------------------------------------------------------*/}
                </div>
            );
          }
    }
}

export default AdminDoctors;
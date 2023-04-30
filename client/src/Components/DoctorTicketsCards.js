import React from 'react';
import Axios from 'axios';

import '../App.css';
import Button from 'react-bootstrap/esm/Button';
import { Toast, Form, Modal, Card } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DoctorTicketsCards extends React.Component {
    constructor(props) {
        super();
        this.username = props.username;
        this.date = props.date;

        
        
        this.state = {
            tickets: null,
            complaints: null,
            conclusion: null
        };    
    }


      completeTicket = (idticket) => {
        Axios.post("http://localhost:3001/doctorCompleteTicket", {
                idticket: idticket,
                }).then((response) => {
                    this.componentDidMount();
                }).catch(error => {
                    this.errorToast();
                });
      }


      handleShow = (item) => {
        this.setState({
            show: true,
            selectedTicket: item
        });
      }

      handleClose = () => {
        this.setState({
            show: false,
            selectedTicket: null
        });
        this.state.complaints = null;
        this.state.conclusion = null;
      }


      makeRecordHandler = (idpatient, iddoctor) => {
        if(this.state.complaints == null || this.state.complaints == '' || this.state.conclusion == null || this.state.conclusion == '') {
            toast.error("Fill in all the fields!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
        } else {
            Axios.post("http://localhost:3001/doctorInsertRecordToElectronicCard", {
                idpatient: idpatient,
                iddoctor: iddoctor,
                complaints: this.state.complaints,
                conclusion: this.state.conclusion,
                }).then((response) => {
                    toast.success("The recording was successfully made!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });

                      this.handleClose();

                }).catch(error => {
                    this.errorToast();
                });
        }       
      }

      errorToast = () => {
        toast.error("Error! Something went wrong!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
      }

      additionPatientToDatabase = (idpatient, iddoctor) => {
        Axios.post("http://localhost:3001/doctorAddPatientToDatabase", {
                idpatient: idpatient,
                iddoctor: iddoctor,
                }).then((response) => {
                   this.successAddingPatient();
                }).catch(error => {
                    this.errorAddingPatient();
                });
      }

      successAddingPatient = () => {
        toast.success("The patient has been successfully added to the database!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      };

      errorAddingPatient = () => {
        toast.error("An error occurred when adding a patient to the database. Try again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      };
    

      componentDidMount() {
        Axios.post("http://localhost:3001/doctorOutputTickets", {
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
                                    <tr>Patient: {item.patientSurname} {item.patientName} {item.patientPatronymic}</tr>
                                </Card.Text>
                                <Button variant="btn btn-success" onClick={(e)=> {this.completeTicket(item.idtickets)}}>Completed</Button>
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

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Body>
                            <div class="card-header text-uppercase bold" style={{fontSize: '19px', marginBottom: '3%'}}>Details</div>
                            <div><strong>Time:</strong> {this.state.selectedTicket && this.state.selectedTicket.time}</div>
                            <div><strong>Patient:</strong> {this.state.selectedTicket && this.state.selectedTicket.patientSurname} {this.state.selectedTicket && this.state.selectedTicket.patientName} {this.state.selectedTicket && this.state.selectedTicket.patientPatronymic}</div>
                            <div><strong>Gender:</strong> {this.state.selectedTicket && this.state.selectedTicket.patientGender}</div>
                            <div><strong>Age:</strong> {this.state.selectedTicket && this.state.selectedTicket.patientAge}</div>
                            <div><strong>Address:</strong> {this.state.selectedTicket && this.state.selectedTicket.patientAddress}</div>
                            <div><strong>Phone:</strong> {this.state.selectedTicket && this.state.selectedTicket.patientPhone}</div>
                            <Button variant="outline-warning" onClick={(e)=> {this.additionPatientToDatabase(this.state.selectedTicket && this.state.selectedTicket.patientId, this.state.selectedTicket && this.state.selectedTicket.doctor)}}>Add patient to the patient's database</Button>
                            <div className='py-3'><strong>Complaints:</strong></div>
                            <Form.Control type="text" 
                                    size="lg" 
                                    autoComplete="complaints" 
                                    onChange={(e) => {
                                            this.state.complaints = e.target.value;
                                        }} 
                                    className="position-relative" />

                            <div className='py-3'><strong>Conclusion:</strong></div>
                            <Form.Control type="text" 
                                    size="lg" 
                                    autoComplete="conclusion" 
                                    onChange={(e) => {
                                            this.state.conclusion = e.target.value;
                                        }} 
                                    className="position-relative" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={(e) => {this.makeRecordHandler(this.state.selectedTicket && this.state.selectedTicket.patientId, this.state.selectedTicket && this.state.selectedTicket.doctor)}}>Make a record</Button>
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            );
          }
    }
}

export default DoctorTicketsCards;
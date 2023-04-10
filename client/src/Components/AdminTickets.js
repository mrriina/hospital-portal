import React from 'react';
import Axios from 'axios';

import DoctorsListForNewTicket from './DoctorsListForNewTicket';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class AdminTickets extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            tickets: null,
            data: null,
            openModal: false,
            openModalNewTicket: false
        };   
        
        this.filterCategory = 'all';
        this.sortDirection = true;

        this.date = '';
        this.time = '';
        this.free = '';
        this.doctor = '';
    }

    deleteTicket = (idtickets) => {
        Axios.post("http://localhost:3001/deleteTicketAdminHome", {
            ticket: idtickets,
        }).then((response) => {
            this.componentDidMount();
        });
     };

     newTicket = () => {
        this.free = 'true';
        
        Axios.post("http://localhost:3001/newTicketAdminHome", {
            date: this.date,
            time: this.time,
            free: this.free,
            doctor: this.doctor
        }).then((response) => {
            this.onCloseNewTicketModal();
            this.componentDidMount();
        });
     };

     newTicketModal = () =>{
        this.setState({openModalNewTicket : true});
    }

    onCloseNewTicketModal = ()=>{
        this.setState({openModalNewTicket : false})
    }

    sortFreeColumn = () => {
        this.sortDirection = !this.sortDirection;
        this.sortDirection === false ? this.state.data.sort((a, b) => a.free > b.free ? 1 : -1): this.state.data.sort((a, b) => a.free < b.free ? 1 : -1);

        this.setState({
            tickets:  this.state.data.map(item => {
              return (
                <tr>
                    <th scope="row">{item.idtickets}</th>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.doctorSurname} {item.doctorName} {item.doctorPatronymic}</td>
                    <td>{item.user}</td>
                    <td>{item.free}</td>
                    <Button variant="btn btn-outline-danger" onClick={(e)=> {this.deleteTicket(item.idtickets)}}>Delete</Button>
                </tr>
              );
            })
          });      
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getTicketsAdminHome", {
            }).then((response) => {
                this.setState({
                    data: response.data
                })
                if(this.filterCategory === 'all') {
                    this.setState({
                        tickets: response.data.map(item => {
                          return (
                            <tr>
                                <th scope="row">{item.idtickets}</th>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.doctorSurname} {item.doctorName} {item.doctorPatronymic}</td>
                                <td>{item.user}</td>
                                <td>{item.free}</td>
                                <Button variant="btn btn-outline-danger" onClick={(e)=> {this.deleteTicket(item.idtickets)}}>Delete</Button>
                            </tr>
                          );
                        })
                      });
                }
                else {
                    this.setState({
                        tickets: response.data.map(item => {
                            if(item.doctorSpeciality === this.filterCategory) {
                                return (
                                    <tr>
                                        <th scope="row">{item.idtickets}</th>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>{item.doctorSurname} {item.doctorName} {item.doctorPatronymic}</td>
                                        <td>{item.user}</td>
                                        <td>{item.free}</td>
                                        <Button variant="btn btn-outline-danger" onClick={(e)=> {this.deleteTicket(item.idtickets)}}>Delete</Button>
                                    </tr>
                                  );
                            }
                        })
                      });
                }
            });
      }
    
    render() {
        if (!this.state.tickets) {
            return null;
          } else {
            return (
                <div>
                    <Button variant="btn btn-outline-secondary" onClick={(e)=> {this.newTicketModal()}}>New Ticket</Button>

                    <DropdownButton title="Filter" variant="secondary" style={{float: 'right'}} onSelect={(eventKey)=>{this.filterCategory = eventKey; this.componentDidMount();}}>
                        <Dropdown.Item eventKey="all">all</Dropdown.Item>
                        <Dropdown.Item eventKey="therapist">therapist</Dropdown.Item>
                        <Dropdown.Item eventKey="pediatrician">pediatrician</Dropdown.Item>
                        <Dropdown.Item eventKey="surgeon">surgeon</Dropdown.Item>
                        <Dropdown.Item eventKey="psychiatrist">psychiatrist</Dropdown.Item>
                        <Dropdown.Item eventKey="ophthalmologist">ophthalmologist</Dropdown.Item>
                        <Dropdown.Item eventKey="otolaryngologist">otolaryngologist</Dropdown.Item>
                        <Dropdown.Item eventKey="dentist">dentist</Dropdown.Item>
                    </DropdownButton>

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Patient</th>
                                <th scope="col" onClick={this.sortFreeColumn} style={{cursor: 'pointer'}}>Free</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.tickets}</tbody>
                    </table>

{/*------------------------------------------- new ticket modal ---------------------------------------------*/}
                    <Modal open={this.state.openModalNewTicket} onClose={this.onCloseNewTicketModal}>
                        <Container id="main-container" className="d-grid h-100">
                            <Form id="sign-in-form" className="text-center p-3 w-100">
                                <h1 className="mb-3 fs-3 fw-normal">New ticket:</h1>
                                <Form.Group className="mb-3">
                                    <Form.Control type="date" 
                                                size="lg" 
                                                placeholder="Date" 
                                                autoComplete="date" 
                                                onChange={(e) => {
                                                        this.date = e.target.value;
                                                    }} 
                                                className="position-relative" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="time" 
                                                size="lg" 
                                                placeholder="Time" 
                                                autoComplete="time" 
                                                className="position-relative"
                                                onChange = { (e) => {
                                                    this.time = e.target.value;
                                                }} />
                                </Form.Group>
                                <DoctorsListForNewTicket func={(val)=>{this.doctor = val}}/>
                                
                                <div className="d-grid">
                                    <Button variant="primary" onClick={this.newTicket} size="lg">Create</Button>
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

export default AdminTickets;
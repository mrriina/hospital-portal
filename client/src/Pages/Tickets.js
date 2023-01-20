import React, {useState} from 'react';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import DoctorList from '../Components/DoctorsList';
import TimeTicketsList from '../Components/TimeTicketsList';
import TicketsCards from '../Components/TicketsCards';
import '../Home.css';
import '../App.css';

function Tickets() {
    const username = window.location.href.split("=")[1];

    const [speciality, setSpeciality] = useState("");
    const [chosenDoc, setChosenDocId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDoctors, setShowDoctors] = useState(false);
    const handleCloseDoctors = () => setShowDoctors(false);
    const handleShowDoctors = () => setShowDoctors(true);

    const [showTime, setShowTime] = useState(false);
    const handleCloseTime = () => setShowTime(false);
    const handleShowTime = () => setShowTime(true);

    const reserveTicketHandler = () => {
        Axios.post("http://localhost:3001/reserveTicket", {
            doctor: chosenDoc,
            date: date,
            time: time,
            username: username,
        }).then((response) => {
            handleClose();
            Test();
        });
     };

     function Test() {
        return(<TicketsCards username={username}/>);
     }

    return (
            <div>
                <div>
                  <Button variant="btn btn-outline-secondary" onClick={handleShow} size="lg">New ticket</Button>
               </div>
               <div className='indent'>
                    <Test/>
               </div>

 {/*-------------------------------------------------- modal for new ticket --------------------------------------------------------- */}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                     <div className="text-center w-100">
                        <h1 className="mb-3 fs-3 fw-normal">New ticket</h1>
                     </div>
                  </Modal.Header>

                  <Modal.Body>
                    <Form.Select className='indent' onChange={(e) => {setSpeciality (e.target.value); setStep1(false);}}>
                        <option>Choose a speciality..</option>
                        <option value="therapist">therapist</option>
                        <option value="pediatrician">pediatrician</option>
                        <option value="surgeon">surgeon</option>
                        <option value="psychiatrist">psychiatrist</option>
                        <option value="ophthalmologist">ophthalmologist</option>
                        <option value="otolaryngologist">otolaryngologist</option>
                        <option value="dentist">dentist</option>
                    </Form.Select>

                    <Form.Group controlId="sign-up-email-address">
                       <Form.Control type="date" 
                                   size="xs" 
                                   autoComplete="date" 
                                   onChange={(e) => {
                                    setDate(e.target.value);
                                   }}
                                   className="position-relative form-control indent" />
                    </Form.Group>

                    <div>
                        <Button variant="primary" className='indent' onClick={()=>{handleShowDoctors(); setStep2(false);}} size="xs" disabled={step1}>Choose doctor</Button>
                    </div>
                    
                    <div>
                        <Button variant="primary" className='indent' onClick={handleShowTime} size="xs" disabled={step2}>Choose time</Button>
                    </div>


    {/*------------------------------------------ modal for choosing doctor -------------------------------------------------- */}
                    <Modal show={showDoctors} onHide={handleCloseDoctors}>
                        <Modal.Header>
                            <div className="text-center w-100">
                                <h1 className="mb-3 fs-3 fw-normal">Choose doctor</h1>
                            </div>
                        </Modal.Header>

                        <Modal.Body>
                            <Form id="sign-up-form" >
                                <DoctorList speciality={speciality} func={setChosenDocId}/>
                            </Form>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDoctors}>Choose</Button>
                        </Modal.Footer>
                    </Modal>
    {/* --------------------------------------------------------------------------------------------------------------------- */}


    {/*------------------------------------------ modal for choosing time -------------------------------------------------- */}
                    <Modal show={showTime} onHide={handleCloseTime}>
                        <Modal.Header>
                            <div className="text-center w-100">
                                <h1 className="mb-3 fs-3 fw-normal">Choose time</h1>
                            </div>
                        </Modal.Header>

                        <Modal.Body>
                            <Form id="sign-up-form" >
                                <TimeTicketsList doctor={chosenDoc} date={date} func={setTime}/>
                            </Form>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseTime}>Choose</Button>
                        </Modal.Footer>
                    </Modal>
    {/* --------------------------------------------------------------------------------------------------------------------- */}
                  </Modal.Body>
                  
                  <Modal.Footer>
                    <Button variant="secondary" onClick={reserveTicketHandler}>Reserve</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </Modal.Footer>
               </Modal>
 {/*-------------------------------------------------------------------------------------------------------------------------- */}
            </div>
        )
}

export default Tickets;
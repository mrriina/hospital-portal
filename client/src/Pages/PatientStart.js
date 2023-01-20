import React, {useState} from "react";
import Axios from 'axios';
import '../App.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function PatientStart() {
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const username = window.location.href.split("=")[1];

    const apply = () => {
      if(name && surname && patronymic && age && sex && address && phone && username) {
         Axios.post("http://localhost:3001/applyInfPatient", {
            name: name,
            surname: surname,
            patronymic: patronymic,
            age: age,
            sex: sex,
            address: address,
            phone: phone,
            username: username,
        }).then((response) => {
            setStatus('success');
            window.location.assign('http://localhost:3000/patientHome?username='+username);
        });
      } else {
         setStatus('all fields must be filled in!');
      }
   };

   return (
      <>
         <Container id="main-container" className="d-grid h-100">
            <Form id="sign-in-form" className="text-center p-3 w-100">
               <h1 className="mb-3 fs-3 fw-normal">Fill in the information about yourself:</h1>
               <h2 className="status" style={{color: status=='success' ? 'green' : 'red' }}>{status}</h2>
               <Form.Group>
                  <Form.Control type="text" 
                              size="lg" 
                              placeholder="Name" 
                              autoComplete="name" 
                              onChange={(e) => {
                                    setName(e.target.value);
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
                                setSurname(e.target.value);
                              }} />
               </Form.Group>
               <Form.Group className="mb-3">
                  <Form.Control type="text" 
                              size="lg" 
                              placeholder="Patronymic" 
                              autoComplete="patronymic" 
                              className="position-relative"
                              onChange = { (e) => {
                                setPatronymic(e.target.value);
                              }} />
               </Form.Group>
               <Form.Group className="mb-3">
                  <Form.Control type="text" 
                              size="lg" 
                              placeholder="Age" 
                              autoComplete="age" 
                              className="position-relative"
                              onChange = { (e) => {
                                setAge(e.target.value);
                              }} />
               </Form.Group>
               <div>
                <div class="form-check">
                        <input
                            type="radio"
                            class="form-check-input"
                            onChange={()=>{setSex("male")}}
                            value="male"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">Male</label>
                    </div>
                    <div class="form-check">
                        <input
                            type="radio"
                            class="form-check-input"
                            onChange={()=>{setSex("female")}}
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
                                setAddress(e.target.value);
                              }} />
               </Form.Group>
               <Form.Group className="mb-3">
                  <Form.Control type="text" 
                              size="lg" 
                              placeholder="Phone" 
                              autoComplete="phone" 
                              className="position-relative"
                              onChange = { (e) => {
                                setPhone(e.target.value);
                              }} />
               </Form.Group>
            
               <div className="d-grid">
                  <Button variant="primary" onClick={apply} size="lg">Apply</Button>
               </div>
            </Form>
         </Container>
      </>
   );
}
 
export default PatientStart;
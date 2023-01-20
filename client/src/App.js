import React, {useState} from "react";
import Axios from 'axios';
import './App.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
   const [usernameReg, setUernameReg] = useState("");
   const [passwordReg, setPasswordReg] = useState ("");
   const [confPasswordReg, setConfPasswordReg] = useState ("");

   const [username, setUername] = useState("");
   const [password, setPassword] = useState ("");
 
   const [loginStatus, setLoginStatus] = useState("");
   const [registerStatus, setRegisterStatus] = useState("");
   
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
 
   const register = () => {
      if(confPasswordReg != passwordReg) {
         setRegisterStatus('passwords don`t match');
      }
      else {
         Axios.post("http://localhost:3001/register", {
            username: usernameReg,
            password: passwordReg,
            role: 'patient',
           }).then((response) => {
              console.log(response);
              
           });
         window.location.assign('http://localhost:3000/patientStart?username='+usernameReg);
         handleClose();
      }
   };

   const login = () => {
      Axios.post("http://localhost:3001/login", {
         username: username,
         password: password,
      }).then((response) => {
         if (response.data[0] != null) {
            setLoginStatus('success');
            if(response.data[0].role == 'patient') {
               window.location.assign('http://localhost:3000/patientHome?username='+username);
            }
            else if(response.data[0].role == 'admin'){
               window.location.assign('http://localhost:3000/adminHome?username='+username);
            }
         } else {
            setLoginStatus ('incorrect username or password');
         }
      });
   };

   return (
         <Container id="main-container" className="d-grid h-100">
            <Form id="sign-in-form" className="text-center p-3 w-100">
               <img className="mb-4 bootstrap-logo" 
                     src="https://img2.freepng.ru/20180713/rzc/kisspng-hospital-logo-clinic-health-care-physician-5b48c1801f8383.2739660215314947841291.jpg" 
                     alt="Bootstrap 5" />

               <h1 className="mb-3 fs-3 fw-normal">Please sign in</h1>
               <h2 className="status" style={{color: loginStatus=='success' ? 'green' : 'red' }}>{loginStatus}</h2>
               <Form.Group>
                  <Form.Control type="text" 
                              size="lg" 
                              placeholder="Username" 
                              autoComplete="username" 
                              onChange={(e) => {
                                    setUername (e.target.value);
                                 }} 
                              className="position-relative" />
               </Form.Group>
               <Form.Group className="mb-3">
                  <Form.Control type="password" 
                              size="lg" 
                              placeholder="Password" 
                              autoComplete="current-password" 
                              className="position-relative"
                              onChange = { (e) => {
                                 setPassword (e.target.value);
                              }} />
               </Form.Group>
            
               <div className="d-grid">
                  <Button variant="primary" onClick={login} size="lg">Sign in</Button>
               </div>

               <div class="row">
                  <div class="col-md-4 col-md-push-8">
                     <h2 className="noAccount">no account?</h2>
                  </div>
                  <div class="col-md-4 col-md-pull-4">
                     <button type="button" class="btn btn-link btn-xs" onClick={handleShow} >Sign up</button>
                  </div>
               </div>
               
               <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                     <div className="text-center w-100">
                        <img className="mb-4 bootstrap-logo" 
                                 src="https://img2.freepng.ru/20180713/rzc/kisspng-hospital-logo-clinic-health-care-physician-5b48c1801f8383.2739660215314947841291.jpg" 
                                 alt="Bootstrap 5" />
                           
                        <h1 className="mb-3 fs-3 fw-normal">Sign up</h1>
                        <h2 className="status" style={{color: 'red' }}>{registerStatus}</h2>
                     </div>
                  </Modal.Header>

                  <Modal.Body>
                     <Form id="sign-up-form" >
                        <Form.Group controlId="sign-up-email-address">
                           <Form.Control type="text" 
                                       size="lg" 
                                       placeholder="Username" 
                                       autoComplete="username" 
                                       onChange={(e) => {
                                          setUernameReg(e.target.value);
                                       }}
                                       className="position-relative form-control" />
                        </Form.Group>

                        <Form.Group className="mb-3 indent">
                           <Form.Control type="password" 
                                       size="lg" 
                                       placeholder="Password" 
                                       autoComplete="current-password" 
                                       className="position-relative"
                                       onChange={(e) =>{
                                          setPasswordReg(e.target.value);
                                       }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Form.Control type="password" 
                                       size="lg" 
                                       placeholder="Confirm password" 
                                       autoComplete="current-password" 
                                       className="position-relative"
                                       onChange={(e) =>{
                                          setConfPasswordReg(e.target.value);
                                       }} />
                        </Form.Group>
                     </Form>
                  </Modal.Body>
                  
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>Close</Button>
                     <Button variant="primary" onClick={register}>Register</Button>
                  </Modal.Footer>
               </Modal>
            </Form>
         </Container>
   );
}
 
export default App;
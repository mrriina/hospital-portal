import React, {useState} from "react";
import '../Home.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image} from 'react-bootstrap';

import DoctorScheduleComponent from '../Components/DoctorScheduleComponent';
 
function DoctorHome() {
   const [myProfileComponentStatus, setMyProfileComponentStatus] = useState("");
   const [scheduleComponentStatus, setScheduleComponentStatus] = useState("");
   const [patientAccountingComponentStatus, setPatientAccountingComponentStatus] = useState("");

   // function SetMyProfileComponent() {
   //    if (myProfileComponentStatus) {
   //      return <AdminPatients />;
   //    }
   //  }

    function SetScheduleComponent() {
      if (scheduleComponentStatus) {
        return <DoctorScheduleComponent />;
      }
    }

   //  function SetPatientAccountingComponent() {
   //      if (patientAccountingComponentStatus) {
   //        return <AdminTickets />;
   //      }
   //    }

   

   return (
      <>
         <Navbar bg="dark" variant="dark" id="nav">
            <Navbar.Brand>
               <a className="aStyle">
                  <span>Hospital</span>
               </a>
            </Navbar.Brand>
            <Nav>
            {/* className="nav-content" */}
               {/* <Nav.Link onClick={()=>{setPatientStatus(true); setDoctorsStatus(false); setTicketsStatus(false);}}>Patients</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setDoctorsStatus(true); setTicketsStatus(false);}}>Doctors</Nav.Link>
               <Nav.Link onClick={()=>{setPatientStatus(false); setDoctorsStatus(false); setTicketsStatus(true);}}>Tickets</Nav.Link> */}
               {/* <Nav.Link onClick={()=>{window.location.assign('http://localhost:3000/');}}>Logout</Nav.Link> */}
               <Image src='https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
                            rounded
                            height='30'
                            className="mr-2"></Image>
                {/* <h1 className="fs-5 logoNavText">Profile</h1> */}
                <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="Profile"
                    menuVariant="dark"
                    ></NavDropdown>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </Nav>  
         </Navbar>
         <div className="body">
            <DoctorScheduleComponent />
         </div>
      </>
   );
}
 
export default DoctorHome;
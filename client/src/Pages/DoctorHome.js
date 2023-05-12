import React, {useState} from "react";
import '../Home.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image} from 'react-bootstrap';

import DoctorMyProfileComponent from '../Components/DoctorMyProfileComponent';
import DoctorScheduleComponent from '../Components/DoctorScheduleComponent';
import DoctorPatientAccountingComponent from '../Components/DoctorPatientAccountingComponent';
 
function DoctorHome() {
   const doctorusername = window.location.href.split("=")[1];
   const [myProfileComponentStatus, setMyProfileComponentStatus] = useState("");
   const [scheduleComponentStatus, setScheduleComponentStatus] = useState("true");
   const [patientAccountingComponentStatus, setPatientAccountingComponentStatus] = useState("");

   function SetMyProfileComponent() {
      if (myProfileComponentStatus) {
        return <DoctorMyProfileComponent doctorusername={doctorusername} />;
      }
    }

    function SetScheduleComponent() {
      if (scheduleComponentStatus) {
        return <DoctorScheduleComponent />;
      }
    }

    function SetPatientAccountingComponent() {
        if (patientAccountingComponentStatus) {
          return <DoctorPatientAccountingComponent doctorusername={doctorusername} />;
        }
      }

    return (
      <>
         <Navbar bg="dark" variant="dark" id="nav">
            <Navbar.Brand>
               <a className="aStyle">
                  <span>Hospital</span>
               </a>
            </Navbar.Brand>
            <Nav id="navprofile">
               <Image src='https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
                            rounded
                            height='30'
                            className="mt-2"></Image>
               <NavDropdown
                    title={doctorusername}
                    menuVariant="dark">
                  <NavDropdown.Item onClick={()=>{setMyProfileComponentStatus(true); setScheduleComponentStatus(false); setPatientAccountingComponentStatus(false);}}>My profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{setMyProfileComponentStatus(false); setScheduleComponentStatus(true); setPatientAccountingComponentStatus(false);}}>Schedule</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{setMyProfileComponentStatus(false); setScheduleComponentStatus(false); setPatientAccountingComponentStatus(true);}}>Patients Accounting</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{window.location.assign('http://localhost:3000/');}}>Logout</NavDropdown.Item>
               </NavDropdown>
               <div className="mr-4"></div>
            </Nav>  
         </Navbar>
         <div className="body">
            <SetMyProfileComponent />
            <SetScheduleComponent />
            <SetPatientAccountingComponent />
         </div>
      </>
   );
}
 
export default DoctorHome;
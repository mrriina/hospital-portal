import React, {useState} from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Calendar from 'moedim';

import DoctorTicketsCards from '../Components/DoctorTicketsCards';

function DoctorScheduleComponent() {
    const username = window.location.href.split("=")[1];

    const [date, setDate] = useState(new Date());
    
    function TicketsCardsComponent() {
        return(<DoctorTicketsCards username={username} date={date}/>);
     }
    
    return (
        <div class="container-fluid">
            <div class="row gutter gx-3">
                <div className='col-md-9'>
                    <TicketsCardsComponent/> 
                </div>
                <div className='col-md-3'>
                    <Calendar value={date} onChange={(d) => setDate(d)} />
                </div>
            </div>
        </div>
    );
        
          
    
}

export default DoctorScheduleComponent;
import React, {useState} from 'react';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-responsive-modal/styles.css';
import DatePicker from 'sassy-datepicker';

import DoctorTicketsCards from '../Components/DoctorTicketsCards';
import DoctorFreeTicketsCards from '../Components/DoctorFreeTicketsCards';

function DoctorScheduleComponent() {
    const username = window.location.href.split("=")[1];

    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [filterCategory, setFilterCategory] = useState("incomplete");
    
    function TicketsCardsComponent() {
        setDateString(date.toLocaleDateString('zh-Hans-CN'));
        
        if(filterCategory == 'incomplete') return(<DoctorTicketsCards username={username} date={dateString} />);
        else return(<DoctorFreeTicketsCards username={username} date={dateString} />);
     }
    
    return (
        <div className="container-fluid">
            <div className="row gutter gx-3">
                <div className='col-md-9'>
                    <DropdownButton title={filterCategory} variant="secondary" style={{float: 'right'}} onSelect={(eventKey)=>{setFilterCategory(eventKey); TicketsCardsComponent();}}>
                        <Dropdown.Item eventKey="incomplete">incomplete</Dropdown.Item>
                        <Dropdown.Item eventKey="free">free</Dropdown.Item>
                    </DropdownButton>
                    <TicketsCardsComponent/> 
                </div>
                <div className='col-md-3'>
                    <DatePicker value={date} onChange={(d) => {setDate(d)}} />
                </div>
            </div>
        </div>
    ); 
}

export default DoctorScheduleComponent;
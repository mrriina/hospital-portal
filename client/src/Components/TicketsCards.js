import React from 'react';
import Axios from 'axios';

import '../App.css';
import { Icon } from '@iconify/react';
import print from '@iconify-icons/fa-solid/print';
import trash from '@iconify-icons/fa-solid/trash';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import ReactDOMServer from 'react-dom/server';
import PatientPrintCard from '../Components/PatientPrintCard';

class TicketsCards extends React.Component {
    constructor(props) {
        super();
        this.username = props.username;
        this.actualTickets = props.actualTickets;
        
        this.state = {
            tickets: null
        };    
    }

    deleteTicket = (idtickets) => {
        Axios.post("http://localhost:3001/deleteUsersTicket", {
            idtickets: idtickets,
        }).then((response) => {
           this.componentDidMount();
        });
     };   
     
     
     printCard(card) {
        const printWindow = window.open('', 'Print', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title><link rel="stylesheet" href="../App.css" media="print"></head><body>');
        printWindow.document.write(`<div class="col"><div class="card">${ReactDOMServer.renderToStaticMarkup(<PatientPrintCard {...card} />)}</div></div>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
     }

    componentDidMount() {
        Axios.post("http://localhost:3001/outputTickets", {
                username: this.username,
                actualTickets: this.actualTickets,
            }).then((response) => {
                this.setState({
                    tickets: response.data.map(item => {
                      return (
                        <div className="col">
                        <Card id={`card-${item.idtickets}`} style={{ width: '18rem' }} className='indent'>
                            <Card.Body>
                                <div className="card-header text-uppercase">{item.doctorSpeciality}</div>
                                <Card.Text>
                                    <tr>Doctor: {item.doctorName} {item.doctorSurname} {item.doctorPatronymic}</tr>
                                    <tr>Date: {item.date}</tr>
                                    <tr>Time: {item.time}</tr>
                                    <tr>Cabinet: {item.doctorCabinet}</tr>
                                </Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Button variant="light" className="ml-auto" onClick={(e)=> {this.printCard(item)}}>
                                        <Icon icon={print} />
                                    </Button>
                                    <Button variant="light" className="ml-auto" onClick={(e)=> {this.deleteTicket(item.idtickets)}}>
                                        <Icon icon={trash} />
                                    </Button>
                                </div>
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
                </div>
            );
          }
    }
}

export default TicketsCards;
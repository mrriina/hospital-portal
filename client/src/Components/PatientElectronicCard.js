import React, { useState } from 'react';
import Axios from 'axios';

import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Container, Row, Col} from 'react-bootstrap';

class PatientElectronicCard extends React.Component {
    constructor(props) {
        super();
        this.username = props.username;
        
        this.state = {
            tickets: null
        };    
    }

    // deleteTicket = (idtickets) => {
    //     Axios.post("http://localhost:3001/deleteUsersTicket", {
    //         idtickets: idtickets,
    //     }).then((response) => {
    //        this.componentDidMount();
    //     });
    //  };    

    componentDidMount() {
        Axios.post("http://localhost:3001/outputTickets", {
                username: this.username,
            }).then((response) => {
                this.setState({
                    tickets: response.data.map(item => {
                      return (
                        <div class="col">
                        <Card style={{ width: '18rem' }} className='indent'>
                            <Card.Body>
                                <div class="card-header text-uppercase">{item.doctorSpeciality}</div>
                                <Card.Text>
                                    <tr>Date: {item.date}</tr>
                                    <tr>Speciality: {item.doctorName}</tr>
                                    <tr>Doctor: {item.doctorName} {item.doctorSurname} {item.doctorPatronymic}</tr>
                                    <tr>Complaints: {item.time}</tr>
                                    <tr>Conclusion: {item.doctorCabinet}</tr>
                                </Card.Text>
                                <Button variant="btn btn-danger" onClick={(e)=> {this.deleteTicket(item.idtickets)}}>Delete</Button>
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
  
  
  
//     const [page, setPage] = useState(1);

//   function nextPage() {
//     setPage(2);
//   }

//   function prevPage() {
//     setPage(1);
//   }

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h1>Book Title</h1>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <div className={`page page-${page}`}>
//             <h2>Page {page}</h2>
//             <p>Page content goes here</p>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           {page === 1 ? (
//             <Button onClick={nextPage}>Next Page</Button>
//           ) : (
//             <Button onClick={prevPage}>Previous Page</Button>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

export default PatientElectronicCard;
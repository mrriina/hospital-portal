import React, { useState } from 'react';
import Axios from 'axios';

import '../App.css';
import FlipPage, { Page } from "react-pageflip";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Container, Row, Col} from 'react-bootstrap';

class PatientElectronicCard extends React.Component {
    constructor(props) {
        super();
        this.username = props.username;
        
        this.state = {
            cards: [],
            currentCard: 1,
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
        Axios.post("http://localhost:3001/patientGetElectronicCards", {
          username: this.username
        }).then((response) => {
          this.setState({
            cards: response.data.map((item) => {
              return (
                <div className="col">
                  <Card className="Card">
                    <Card.Body>
                      <div className="card-header text-uppercase">
                        {item.doctorSpeciality}
                      </div>
                      <Card.Text>
                        <p><strong>Date:</strong> {item.date}</p>
                        <p><strong>Doctor:</strong> {item.doctorSurname} {item.doctorName} {item.doctorPatronymic}</p>
                        <p><strong>Complaints:</strong> {item.complaints}</p>
                        <p><strong>Conclusion:</strong> {item.conclusion}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          });
        });
      }
    
      handlePrevClick = () => {
        if (this.state.currentCard > 1) {
          this.setState({ currentCard: this.state.currentCard - 1 });
        }
      };
    
      handleNextClick = () => {
        if (this.state.currentCard < this.state.cards.length) {
          this.setState({ currentCard: this.state.currentCard + 1 });
        }
      };
    
      render() {
        const { cards, currentCard } = this.state;
        const numCards = cards.length;
    
        if (!cards.length) {
          return null;
        }
    
        return (
          <div className="CardContainer">
            {cards[currentCard - 1]}
            <div>
                <button type="button" class="btn btn-outline-secondary" onClick={this.handlePrevClick}>Previous</button>
                <label className='elCardPageDisplay'>page {currentCard} of {numCards}</label>
                <button type="button" class="btn btn-outline-secondary" onClick={this.handleNextClick}>Next</button>
            </div>
          </div>
        );
      }
}

export default PatientElectronicCard;
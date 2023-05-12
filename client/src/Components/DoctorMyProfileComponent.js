import React from 'react';
import Axios from 'axios';

import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';

class DoctorMyProfileComponent extends React.Component {
    constructor(props) {
        super();
        this.doctorusername = props.doctorusername;
        
        this.state = {
            doctorinfo: null
        };   
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/doctorGetInfoForMyProfilePage", {
                doctorusername: this.doctorusername,
            }).then((response) => {
                this.setState({
                    doctorinfo: response.data[0]
                })
            });
      }
    
    render() {
        if (!this.state.doctorinfo) {
            return (<div></div>);
          } else {
                return (
                    <Container>
                        <Row>
                        <Col md={3}>
                            <Image
                                src="https://img.freepik.com/premium-vector/set-of-doctor-and-nurse-male-and-female-midwife-color-flat-image-avatars-doctor-with-stethoscope_619989-864.jpg"
                                alt="Doctor"
                                width="300px"
                                height="300px"
                                roundedCircle
                            />
                        </Col>
                        <Col md={6} className="mt-5" style={{ paddingLeft: '110px' }}>
                            <Card>
                                <Card.Header>
                                    <h5>Profile Information</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={4}>First Name:</Col>
                                        <Col md={8}>{this.state.doctorinfo.name}</Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>Last Name:</Col>
                                        <Col md={8}>{this.state.doctorinfo.surname}</Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>Patronymic:</Col>
                                        <Col md={8}>{this.state.doctorinfo.patronymic}</Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>Username:</Col>
                                        <Col md={8}>{this.doctorusername}</Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>Cabinet:</Col>
                                        <Col md={8}>{this.state.doctorinfo.cabinet}</Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>Specialization:</Col>
                                        <Col md={8}>{this.state.doctorinfo.speciality}</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        </Row>
                    </Container>
                );
          }
    }
}

export default DoctorMyProfileComponent;
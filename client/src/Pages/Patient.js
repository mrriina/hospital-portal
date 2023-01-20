import React, {useState} from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Patient() {
    const username = window.location.href.split("=")[1];

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [isDisabled, setIsDisabled] = useState(true);
    const [isEditButton, setIsEditButton] = useState(true);
    const [isApplyButton, setIsApplyButton] = useState(false);

    const edit = () => {
        setIsDisabled(false);
        setIsEditButton(false);
        setIsApplyButton(true);
    };

    const apply = () => {
        setIsDisabled(true);
        setIsEditButton(true);
        setIsApplyButton(false);

        Axios.post("http://localhost:3001/updateInfPatient", {
            name: name,
            surname: surname,
            patronymic: patronymic,
            age: age,
            sex: sex,
            address: address,
            phone: phone,
            username: username,
        }).then((response) => {});
     };

    function ChangeButton() {
        if(isEditButton) {
            Axios.post("http://localhost:3001/changeInfPatient", {
                username: username,
            }).then((response) => {
                setName(response.data[0].name);
                setSurname(response.data[0].surname);
                setPatronymic(response.data[0].patronymic);
                setAge(response.data[0].age);
                setSex(response.data[0].sex);
                setAddress(response.data[0].address);
                setPhone(response.data[0].phone);
            });

            return (
                <div className="d-grid">
                    <Button variant="btn btn-secondary" onClick={edit} size="lg">Edit</Button>
                </div>
            );
        } 

        if(isApplyButton) {
            return (
                <div className="d-grid">
                    <Button variant="btn btn-secondary" onClick={apply} size="lg">Apply</Button>
                </div>
            );
        } 
    }

    return(
            <div>
                <Container id="main-container" className="d-grid h-100">
                    <Form id="sign-in-form" className="text-center p-3 w-100">
                    <h1 className="mb-3 fs-3 fw-normal">Patient:</h1>
                    <Form.Group>
                        <Form.Control type="text" 
                                    size="lg" 
                                    placeholder="Name" 
                                    autoComplete="name" 
                                    onChange={(e) => {
                                            setName(e.target.value);
                                        }} 
                                    value={name}
                                    disabled={isDisabled}
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
                                    }} 
                                    value={surname}
                                    disabled={isDisabled}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" 
                                    size="lg" 
                                    placeholder="Patronymic" 
                                    autoComplete="patronymic" 
                                    className="position-relative"
                                    onChange = { (e) => {
                                        setPatronymic(e.target.value);
                                    }} 
                                    value={patronymic}
                                    disabled={isDisabled}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" 
                                    size="lg" 
                                    placeholder="Age" 
                                    autoComplete="age" 
                                    className="position-relative"
                                    onChange = { (e) => {
                                        setAge(e.target.value);
                                    }} 
                                    value={age}
                                    disabled={isDisabled}/>
                    </Form.Group>
                    <div>
                        <div class="form-check">
                                <input
                                    type="radio"
                                    class="form-check-input"
                                    onChange={()=>{setSex("male")}}
                                    value="male"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    disabled={isDisabled}/>
                                <label class="form-check-label" for="flexRadioDefault1">Male</label>
                            </div>
                            <div class="form-check">
                                <input
                                    type="radio"
                                    class="form-check-input"
                                    onChange={()=>{setSex("female")}}
                                    value="female"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    disabled={isDisabled}/>
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
                                    }} 
                                    value={address}
                                    disabled={isDisabled}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" 
                                    size="lg" 
                                    placeholder="Phone" 
                                    autoComplete="phone" 
                                    className="position-relative"
                                    onChange = { (e) => {
                                        setPhone(e.target.value);
                                    }} 
                                    value={phone}
                                    disabled={isDisabled}/>
                    </Form.Group>
                    
                    <ChangeButton/>
                    </Form>
                </Container>
            </div>
        )
}

export default Patient;
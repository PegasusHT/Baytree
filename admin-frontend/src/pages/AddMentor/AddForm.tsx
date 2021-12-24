import {useContext, useState} from 'react';
import { MentorsContext } from "./UsersContextProvider";
import { Form, Button, Col, Row} from 'react-bootstrap';
import React from "react";


interface Props {
    mentor: any
}

export const AddForm: React.FC<Props> = ({mentor})=> {

    const id = mentor.id;
    const firstName = mentor.firstName;
    const lastName = mentor.lastName;
    const email = mentor.email;
    const role = mentor.role;
    const phone = mentor.phone;

    const [password, setPassword] = useState(mentor.password);

    const {addUser} = useContext(MentorsContext);
    const updatedMentor = {id, firstName, lastName, password, role, email, phone}

    const handleSubmit= (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        addUser(id, updatedMentor);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className={"mb-3"}>
                <Form.Label column sm={"4"}>First Name</Form.Label>
                <Col sm={"7"}>
                    <Form.Control plaintext readOnly defaultValue={mentor.firstName}/>
                </Col>

                <Form.Label column sm={"4"}>Last Name</Form.Label>
                <Col sm={"7"}>
                    <Form.Control plaintext readOnly defaultValue={mentor.lastName}/>
                </Col>

                <Form.Label column sm={"4"}>Role</Form.Label>
                <Col sm={"7"}>
                    <Form.Control plaintext readOnly defaultValue={mentor.role}/>
                </Col>

                <Form.Label column sm={"4"}>Phone number</Form.Label>
                <Col sm={"7"}>
                    <Form.Control plaintext readOnly defaultValue={mentor.phone}/>
                </Col>

                <Form.Label column sm={"4"}>Email</Form.Label>
                <Col sm={"7"}>
                    <Form.Control plaintext readOnly defaultValue={mentor.email}/>
                </Col>

                <Form.Label column sm={"4"}>Set Password</Form.Label>
                <Col sm={"7"}>
                    <Form.Control type={"text"} placeholder={"Password *"}
                                  name={"password"} value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required />
                </Col>
            </Form.Group>
            <Button variant="success" type="submit">
                Add User
            </Button>
        </Form>
    )
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Card, Spinner, Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const RegisterPage = () => {



    const createNewUser = async () => {
        try {
            const userData = {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value
            }

            let response = await fetch(process.env.REACT_APP_BE_URL + "/authors",
                {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                });
            console.log(userData);
            if (response.ok) {
                let data = await response.json();
                console.log(data);
                alert(`Register successful! Author id is: ${data._id}`)
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Container className="mt-5">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Name
                    </InputGroup.Text>
                    <Form.Control id="firstName" aria-describedby="basic-addon3" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Surname
                    </InputGroup.Text>
                    <Form.Control id="lastName" aria-describedby="basic-addon3" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Email
                    </InputGroup.Text>
                    <Form.Control id="email" aria-describedby="basic-addon3" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Password
                    </InputGroup.Text>
                    <Form.Control id="password" aria-describedby="basic-addon3" />
                </InputGroup>
                <Button variant="primary" onClick={createNewUser}>Register</Button>{' '}
            </Container>

        </>
    )
}

export default RegisterPage
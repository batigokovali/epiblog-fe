import { Container, Button, Card, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";

const LoginPage = () => {

    const [blogposts, setBlogposts] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loginUser = async () => {
        try {
            const userData = {
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value
            }

            let response = await fetch(process.env.REACT_APP_BE_URL + "/authors/login",
                {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                });
            if (response.ok) {
                let data = await response.json();
                console.log(data);
                localStorage.setItem("accessToken", `${data.accessToken}`);
                localStorage.setItem("refreshToken", `${data.refreshToken}`)
                let response2 = await fetch(process.env.REACT_APP_BE_URL + "/blogposts/me/stories",
                    {
                        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
                    }
                )
                if (response2.ok) {
                    data = await response2.json()
                    console.log(data)
                    setBlogposts(data.blogposts)
                } else {
                    console.log("error while fetching blogposts")
                }
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postBlogpost = async () => {
        try {
            const blogpostdata = {
                author: localStorage.getItem("accessToken"),
                category: document.querySelector("#category").value,
                content: document.querySelector("#content").value,
                title: document.querySelector("#title").value,
                cover: document.querySelector("#title").value,
                content: document.querySelector("#content").value,
                "readTime.value": document.querySelector("#readtime-value").value,
                "readTime.unit": document.querySelector("#readtime-unit").value
            }
            let response = await fetch(process.env.REACT_APP_BE_URL + "/blogposts",
                {
                    method: "POST",
                    body: JSON.stringify(blogpostdata),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }),
                }
            )
            if (response.ok) {
                let data = await response.json();
                console.log(data);
            } else {
                console.log("something broke :/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <Container className="mt-5">
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
                <Button variant="primary" onClick={loginUser}>Login</Button>{' '}
            </Container>

            <Container className="mt-5">
                {blogposts?.map((blogpost) => (
                    <Card key={blogpost._id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={blogpost?.cover} />
                        <Card.Body>
                            <Card.Title>{blogpost?.title}</Card.Title>
                            <Card.Text>
                                {blogpost?.category}
                            </Card.Text>
                            <Card.Text>
                                {blogpost?.content}
                            </Card.Text>
                            <Card.Text>
                                Read time: {blogpost?.readTime.value} {blogpost?.readTime.unit}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
            <Container>
                {blogposts ? (
                    <>
                        <Button variant="primary" onClick={handleShow}>
                            Create New Blogpost
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Blogpost</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                        Category
                                    </InputGroup.Text>
                                    <Form.Control id="category" aria-describedby="basic-addon3" />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                        Content
                                    </InputGroup.Text>
                                    <Form.Control id="content" aria-describedby="basic-addon3" />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                        Title
                                    </InputGroup.Text>
                                    <Form.Control id="title" aria-describedby="basic-addon3" />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                        Cover
                                    </InputGroup.Text>
                                    <Form.Control id="cover" aria-describedby="basic-addon3" />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                        Read Time
                                    </InputGroup.Text>
                                    <Form.Control id="readtime-value" type="number" aria-describedby="basic-addon3" />
                                    <select name="unit" id="readtime-unit">
                                        <option value="minutes">Minute(s)</option>
                                        <option value="hours">Hour(s)</option>
                                        <option value="years">Year(s)</option>
                                    </select>
                                </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Discard Blogpost
                                </Button>
                                <Button variant="primary" onClick={postBlogpost}>
                                    Post Blogpost
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )
                    :
                    (<></>)}
            </Container>
        </>
    )
}

export default LoginPage
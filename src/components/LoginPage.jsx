import { Container, Button, Card, Modal, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"

const LoginPage = () => {

    const [blogposts, setBlogposts] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const fetchBlogposts = async () => {
        try {
            let response = await fetch(process.env.REACT_APP_BE_URL + "/blogposts/me/stories",
                {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
                }
            )
            if (response.ok) {
                let data = await response.json()
                console.log(data)
                setBlogposts(data.blogposts)
            } else {
                console.log("error while fetching blogposts")
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                localStorage.setItem("accessToken", `${data.accessToken}`);
                localStorage.setItem("refreshToken", `${data.refreshToken}`)
                fetchBlogposts()
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // if (!localStorage.getItem("accessToken"))
        if (searchParams.get("accessToken")) {
            localStorage.setItem("accessToken", searchParams.get("accessToken"))
            navigate("/")
            fetchBlogposts()
        }
    }, [searchParams])

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
                fetchBlogposts()
                handleClose()
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
                <Button variant="primary" className="mb-5" onClick={loginUser}>Login</Button>{' '}
                <a href="http://localhost:3001/authors/googleLogin">
                    <Button className="mb-4 w-100" size="lg" style={{ backgroundColor: "#55acee" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-google mx-2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                        Login with Google
                    </Button>
                </a>
            </Container>



            <Container className="mt-5">
                <Row>

                    {blogposts?.map((blogpost) => (
                        <Col sm={12} md={4} lg={4}>
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
                        </Col>

                    ))}

                </Row>
            </Container>
            <Container>
                {blogposts ? (
                    <>
                        <Button variant="primary" className="mt-3" onClick={handleShow}>
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
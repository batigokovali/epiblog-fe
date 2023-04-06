import { Container, Button, Card, Modal, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Blogposts = (blogposts) => {
    console.log(blogposts)
    return (
        <>
            <p>kek</p>
            {/* {blogposts?.map((blogpost) => (
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

                    ))} */}
        </>
    )
}

export default Blogposts
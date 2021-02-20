import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import {useParams} from 'react-router-dom';
import API_URL from "./apiConfig"
export default function AddComment(props) {

    const history = useHistory();
    const { podId } = useParams()
    const [comment, setComment] = useState([]); 
    
      const onChangeInput = ({ target: { name, value } }) => {
        setComment({ ...comment, [name]: value });
      };


      const onSubmit = (event) => {
        event.preventDefault();
       
        axios.post(`${API_URL}/api/podcast/AddComment/${podId}`, comment)
          .then((res) => {

            history.push(`/Allpodcast/:id/${podId}`);
        })
      };

    return (
        <div>
             <Form className="m-5">
        <Row className="justify-content-center mt-5">
          <Col md={12}>
          <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label><p className="m-b-10 pt-4 f-w-600">Comment</p></Form.Label>
                <Form.Control
                  placeholder="Add Comment..."
                  name="comment"
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
            </Form.Row>
           
            <Button variant="outline-info"
             variant="outline-info"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>



        </div>
    )
}

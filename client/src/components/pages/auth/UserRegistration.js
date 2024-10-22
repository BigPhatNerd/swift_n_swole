import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container, Col, Button, Form, Row } from "react-bootstrap";
import background from "../../../img/diesel_down_black.jpg";
import Spinner from "../../Spinner";

import RegistrationContext from "../../../context/registration/registrationContext";
const UserRegistration = () => {
  const styles = {
    container: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)),url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    },
  };
  const registrationContext = useContext(RegistrationContext);
  const { user, register, setAlert, setEmail, loading } =
    registrationContext;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const { email, password, password2 } = formData;
  console.log("UserRegistration");
  console.log({ registrationContext });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "dark");
    } else {
      setEmail(email);
      register({ email, password });
    }
  };
  console.log({ registrationContext });
  if (user.isAuthenticated) return <Redirect to="/" />;
  return (
    <div id="cover" style={styles.container}>
      <Container>
        <Row className="justify-content-center m-2">
          <h1>User Registration</h1>
        </Row>
        <Col>
          <Form onSubmit={(e) => onSubmit(e)}>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => onChange(e)}
                value={email}
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => onChange(e)}
                value={password}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                onChange={(e) => onChange(e)}
                value={password2}
                name="password2"
                type="password"
                placeholder="Password confirmation"
              />
            </Form.Group>
            {loading && <Spinner />}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default UserRegistration;

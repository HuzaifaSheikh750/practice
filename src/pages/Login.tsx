import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authService  } from "../hook/auth";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://api.escuelajs.co/api/v1/auth/login`,
        {
          email: email,
          password: password,
        }
      );
    if (response.data.access_token) {
        authService.setToken(response.data.access_token);
    }
      navigate("/profile");
    //   console.log(authService.getUseremail());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row>
        <Col md="12" lg="12">
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;

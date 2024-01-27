import { useState, useEffect } from "react";
import Axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Badge, ListGroup, Form, Button } from "react-bootstrap";

export default function App() {
  const api = "http://localhost:3001";
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get(`${api}/users`).then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  const createUser = () => {
    if (name.trim() === "" || age.trim() === "" || email.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }

    Axios.post(`${api}/createUser`, {
      name: name,
      age: age,
      email: email,
    })
      .then((res) => {
        setError("");
        setUsers([...users, res.data]); // Update the users state with the new user
      })
      .catch((err) => {
        setError("Error creating user.");
      });
  };

  return (
    <Container>
      <div className="result">
        {users.map(({ _id, name, age, email }) => {
          return (
            <ListGroup key={_id}>
              <ListGroup.Item
                variant="dark"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{name}</div>
                  {email}
                </div>
                <Badge bg="success" pill>
                  {age}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>

      <Form className="form">
        <Form.Control
          type="string"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Control
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <Form.Control
          type="string"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button variant="success" type="submit" onClick={createUser}>
          Create User
        </Button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </Container>
  );
}

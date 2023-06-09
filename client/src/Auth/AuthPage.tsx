import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useAppDispatch } from '..//Components/Redux/hooks';
import { loginThunk, signUpThunk } from '../Components/Redux/slice/userSlice';
import type { UserSignUpType } from '../Components/types/UserTypes';
import PhotoUploader from '../Components/Item/avatarPage';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();

  const [input, setInput] = useState<UserSignUpType>(
    auth === 'signup'
      ? { username: '', email: '', password: '', phone: '+7' }
      : { email: '', password: '' },
  );

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (auth === 'signup') {
      dispatch(signUpThunk(input));
      if (true) {
        setRegistrationSuccess(true);
      }
    } else {
      dispatch(loginThunk(input));
      if (true) {
        return <Navigate to="/" />; // Перенаправление на главную страницу после входа
      }
    }
  };

  if (registrationSuccess) {
    return <Navigate to="/" />; // Перенаправление на главную страницу после регистрации и загрузки фото
  }

  return (
    <Row>
      <Col>
        <Form onSubmit={submitHandler}>
          {auth === 'signup' && (
            <>
              <FormGroup floating>
                <Input
                  id="examplePhone"
                  name="phone"
                  placeholder="Phone"
                  type="text"
                  value={input.phone}
                  onChange={changeHandler}
                />
                <Label for="exampleName">Phone</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="exampleName"
                  name="username"
                  placeholder="Name"
                  type="text"
                  value={input.username}
                  onChange={changeHandler}
                />
                <Label for="exampleName">Name</Label>
              </FormGroup>
            </>
          )}
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={input.email}
              onChange={changeHandler}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              value={input.password}
              onChange={changeHandler}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>
          <Button type="submit">{auth === 'signup' ? 'Signup' : 'Login'}</Button>
        </Form>
      </Col>
    </Row>
  );
}

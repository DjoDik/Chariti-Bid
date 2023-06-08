import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useAppDispatch } from '../redux/hooks';
import { loginThunk, signUpThunk } from '../redux/slices/userSlice';
import type { UserSignUpType } from '../types/UserTypes';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();

  const [input, setInput] = useState<UserSignUpType>(
    auth === 'signup'
      ? {
          username: '',
          email: '',
          password: '',
          phone: '+7',
          avatar: '',
          onlinestatus: false,
        }
      : { email: '', password: '' },
  );

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(auth === 'signup');
    return auth === 'signup' ? dispatch(signUpThunk(input)) : dispatch(loginThunk(input));
  };

  return (
    <Row>
      <Col className="mt-5 d-flex justify-content-center">
        {' '}
        {/* Добавляем класс "mt-5" для отступа сверху */}
        <Form onSubmit={submitHandler} className="modal-form">
          {auth === 'signup' && (
            <>
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input
                  id="exampleName"
                  name="username"
                  placeholder="Enter your name"
                  type="text"
                  value={input.username}
                  onChange={changeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePhone">Phone</Label>
                <Input
                  id="examplePhone"
                  name="phone"
                  placeholder="Enter your phone number"
                  type="text"
                  value={input.phone}
                  onChange={changeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleAvatar">Avatar</Label>
                <Input
                  id="exampleAvatar"
                  name="avatar"
                  placeholder="Choose an avatar"
                  type="file"
                  value={input.avatar}
                  onChange={changeHandler}
                />
              </FormGroup>
            </>
          )}
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={input.email}
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={input.password}
              onChange={changeHandler}
            />
          </FormGroup>
          <div className="text-center">
            <Button type="submit">{auth === 'signup' ? 'Signup' : 'Login'}</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

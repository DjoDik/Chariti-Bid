import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useAppDispatch } from '..//Components/Redux/hooks';
import { loginThunk, signUpThunk } from '../Components/Redux/slice/userSlice';
import type { UserSignUpType } from '../Components/types/UserTypes';
import PhotoUploader from '../Components/Item/avatarPage';

export default function AuthPage({ modalOpen, toggleModal }): JSX.Element {
  const { auth } = useParams();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [input, setInput] = useState<UserSignUpType>(
    auth === 'signup'
      ? { username: '', email: '', password: '', phone: '+7' }
      : { email: '', password: '' },
  );

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (auth === 'signup') {
      dispatch(signUpThunk(input));
      setRegistrationSuccess(true);
      toggleModal();
    } else {
      dispatch(loginThunk(input));
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Row>
      <Col>
        <div className="login-box">
          <form onSubmit={submitHandler} className="user-box">
            {registrationSuccess ? (
              <PhotoUploader modalOpen={modalOpen} toggleModal={toggleModal} />
            ) : (
              <>
                {auth === 'signup' && (
                  <>
                    <FormGroup floating className="user-box">
                      <div className="user-box">
                        <input
                          id="examplePhone"
                          name="phone"
                          type="text"
                          value={input.phone}
                          onChange={changeHandler}
                        />
                        <Label for="examplePhone">Phone</Label>
                      </div>
                    </FormGroup>
                    <div className="user-box">
                      <input
                        id="exampleName"
                        name="username"
                        type="text"
                        value={input.username}
                        onChange={changeHandler}
                      />
                      <label>Name</label>
                    </div>
                  </>
                )}

                <div className="user-box">
                  <input
                    id="exampleEmail"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeHandler}
                  />
                  <label>Email</label>
                </div>

                <FormGroup floating>
                  <div className="user-box">
                    <input
                      id="examplePassword"
                      name="password"
                      type="password"
                      value={input.password}
                      onChange={changeHandler}
                    />
                    <Label for="examplePassword">Password</Label>
                  </div>
                </FormGroup>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <button className="clearButton" type="submit">
                    {auth === 'signup' ? 'Signup' : 'Login'}
                  </button>
                </a>
              </>
            )}
          </form>
        </div>
      </Col>
    </Row>
  );
}

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {login} from './store/actions';
import {push} from 'connected-react-router'
import _ from 'lodash';
import {
  Button,
  Spinner,
  Form,
  Container,
  Col,
  Alert,
  Row
} from 'react-bootstrap';

const Validation_success = {
  validationError: ""
};
const Validation_fail_1 = {
  validationError: "Enter Username"
};
const Validation_fail_2 = {
  validationError: "Enter Password"
};

const Login = (props) => {
  const [usernameValue, setUsername] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [validatingError, setvalidatingError] = useState(null);
  useEffect(() => {
    const query = {
      name: usernameValue,
      password: passwordValue
    };
    !_.isNull(validatingError) && validatingError === Validation_success && (props.login(query), setvalidatingError(null))
  });

  const handleSubmit = (e) => {
    setvalidatingError('validated');
    e.preventDefault();
    _.isEmpty(usernameValue)
      ? (setvalidatingError(Validation_fail_1))
      : (
        _.isEmpty(passwordValue)
        ? setvalidatingError(Validation_fail_2)
        : (setvalidatingError(Validation_success)));
  }
  return (<Container>
    <Row>
    <Col md={3}/>
      <Col md={6}>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter UserName" name="username" value={usernameValue} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={passwordValue} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            {
              !_.isNull(validatingError) && validatingError.validationError && !_.isEmpty(validatingError) && <Alert variant="danger ">
                  {validatingError.validationError}
                </Alert>
            }
          </Form.Group>
          <div>
            <Button variant="outline-warning" disabled={props.isLoading || props.isLogin} type="submit" block>{
                props.isLoading
                  ? (<React.Fragment>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                    Loading...
                  </React.Fragment>)
                  : <span>{
                        props.isLogin
                          ? ("logged In")
                          : ("login")
                      }</span>
              }
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </Container >)
}

const mapStateToProps = function(state) {
  return {isLogin: state.reducer.token, isLoading: state.meta.isLoading}
}

const mapDispatchToProps = {
  login: login,
  redirect: push
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);;

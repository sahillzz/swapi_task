import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {search} from './store/actions';
import {logout} from './store/actions';
import _ from 'lodash'
import {error} from '../redux/actions';
import {Alert, Container} from 'react-bootstrap';

const ErrorAlert = (props) => {
  return (<Container>
    {
      !_.isEmpty(props.error) && <Alert md={7} variant="danger" onClick={() => props.clearError({})} dismissible="dismissible">
          {props.error}
        </Alert>
    }
  </Container>)
}

const mapStateToProps = function(state) {
  return {error: state.meta.error}
}

const mapDispatchToProps = {
  clearError: error
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);

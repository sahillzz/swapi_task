import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {search} from './store/actions';
import {logout} from './store/actions';
import {Navbar, Nav, ButtonToolbar} from 'react-bootstrap';

const NavBar = (props) => (<div>
  <Nav bg="dark" variant="dark" className="nav">
    <Nav.Link className="mr-auto">
      <Link to="/">Home</Link>
    </Nav.Link>
    {
      props.isLogin
        ? <Nav.Link>
            <Link onClick={props.logout} to="/login"><span>Logout</span></Link>
          </Nav.Link>
        : <Nav.Link>
            <Link to="/login"><span>Login</span></Link>
          </Nav.Link>
    }
  </Nav>
</div>)

const mapStateToProps = function(state) {
  return {isLogin: state.reducer.token}
}

const mapDispatchToProps = {
  logout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

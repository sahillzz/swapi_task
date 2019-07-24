import React, {useState} from 'react'
import {connect} from 'react-redux'
import {search, nextPage} from './store/actions';
import PlanetList from './PlanetList';
import _ from 'lodash';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ButtonToolbar,
  Spinner
} from 'react-bootstrap';

const Home = (props) => {
  const [searhValue, setSearhValue] = useState('');
  const [validatinError, setValidatinError] = useState('');
  const handleSearch = () => {
    props.search({search: searhValue});
  }
  return (<Container>
    {
      props.isLogin
        ? (<React.Fragment>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <InputGroup>
                <FormControl type="text" placeholder="Search By Planet Name" name="search" value={searhValue} onChange={(e) => setSearhValue(e.target.value)}/>
              </InputGroup>
              <Row>
                <Col sm={12}><PlanetList data={props.searchResult.results
            ? props.searchResult
            : []} nextPage={props.nextPage}/></Col>
              </Row>
              <Row >
                <Col sm={12}>
                  {!_.isNull(props.searchResult.next) && <Button variant="outline-warning" size="lg" block="block" onClick={() => props.nextPage(props.searchResult.next)}>Load Mode</Button>}
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <Button variant="outline-warning" type="submit" disabled={props.isLoading || _.isEmpty(searhValue)} onClick={handleSearch}>
                {
                  props.isLoading
                    ? (<React.Fragment>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                      Loading...
                    </React.Fragment>)
                    : <span>Search</span>
                }
              </Button>
            </Col>
          </Row>
        </React.Fragment>)
        : (<Row className="justify-content-md-center">
          <Col md="auto" style={{'color':'white', 'fontSize':'x-Large'}}>Login To Continue</Col>
        </Row>)
    }
  </Container>)
}

const mapStateToProps = function(state) {
  return {searchResult: state.reducer.searchResult, isLogin: state.reducer.token, isLoading: state.meta.isLoading}
}

const mapDispatchToProps = {
  search: search,
  nextPage: nextPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);;

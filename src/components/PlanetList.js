import React, {useState} from 'react'
import _ from 'lodash';
import {ListGroup, ProgressBar} from 'react-bootstrap';
const population=(e)=>{
  switch(true) {
  case e<100000:
    return 20
    break;
  case e<10000000:
    return 60
    break;
  case e<10000000000:
    return 100
    break;
  default:
    return 0
}
}
const PlanetList = (props) => {
  const {data} = props;
  return (<React.Fragment>
    <ListGroup className="listGroup">
      {
        !_.isEmpty(data) && data.results.length > 0 && data.results.map((x, index) => {
          return (
            <div className="itemContainer">
              <ProgressBar striped="striped" variant="warning" now={population(x.population)} className="itembar" label={x.name} />
            </div>)
        })
      }
    </ListGroup>
  </React.Fragment>)
}
export default PlanetList;

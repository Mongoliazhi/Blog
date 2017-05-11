import React, { Component, PropTypes } from 'react';



export default class Person extends Component {
    constructor(props) {
        super(props);

    }

   render() {
    const {name,age} = this.props;

      return (
        <div>
          <span>姓名:</span>
          <span>{name}</span>
          <span> age:</span>
          <span>{age}</span>
        </div>
      )
    }
}
Person.PropTypes = {

};
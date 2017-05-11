import React, { Component, PropTypes } from 'react';
import Person from './person.js';

export default class Game extends Component {
	constructor(props){
        super(props)
        this.state={
          name:"",
          age :"",
          persons:[]
        }
      }
      render() {
        const {name,age,persons} = this.state
		// <button type="button" onClick={this._delete.bind(this,index)}>删除</button>
			
			
        return (
          <div>
            <span>姓名:</span><input value={name} name="name" onChange={this._handleChange.bind(this)}></input>
            <span>年龄:</span><input value={age} name="age" onChange={this._handleChange.bind(this)}></input>
            <input type="button" onClick={this._handleClick.bind(this)} value="确认"></input>
            {persons.map((person,index)=>(
				<div>
					<Person key={index} name={person.name} age={person.age}></Person>
					<button type="button" onClick={this._delete.bind(this,index)}>删除</button>
				</div>
            ))}
          </div>
        )
      }
      _handleChange(event){
        this.setState({[event.target.name]:event.target.value})
      }
      _handleClick(){
        const {name,age} = this.state
        this.setState({
          name:"",
          age :"",
          persons:this.state.persons.concat([{name:name,age:age}])
        })
      }
	  _delete(index,e){
		alert(index)
		this.setState({
			persons: this.state.persons.filter((elem, i) => index !== i)
		})		
	  }

}
Game.PropTypes = {

};
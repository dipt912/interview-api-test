import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';


  
class UserType extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleExtraField(event) {
        event.preventDefault()
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        this.props.handleInputChange(event);
    }

    render() {
        const {userTypes, user_types, extra_text_inputs, handleChange} = this.props;
        const extraInput = extra_text_inputs[user_types];
        
        return(
            <div>
            <p> User Types: </p>
            <select name='user_types' value={user_types} onChange={handleChange}> 
              { userTypes.map((ele, i) => 
                   <option  key={i} value={ele}>{ele}</option>
              )}
          </select>
         { extraInput && extraInput.length && (
             extraInput.map((element, i) => {
                 return (
                    <div className="form-item"  key={i}>
                    <label htmlFor={element.value} className="form-item-label">{element.label}</label>
                    <input className="form-item-input" id="Email"
                           name={element.value}
                           value= {this.state[element.value]|| ''}
                           onChange={this.handleExtraField.bind(this)}
                    />
                </div>
                 )
             })
         )}
          </div>
        )
    }

}

export default UserType;
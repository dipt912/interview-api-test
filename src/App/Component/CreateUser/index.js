import React, {Component} from 'react';
import { postEvent, getEvents} from "../../../api-service/api";
import UserType from '../UserType';
import Button from '@material-ui/core/Button';



class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LastName: '',
            FirstName: '',
            Email: '',
            user_types: '',
            userTypes: [],
            extra_text_inputs: {},
            isLoading: false,
            extra_inputs : {}
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        },() => {
            this.forceUpdate()
        });
    }

    handleExtraInputChange = (event) => {
        event.preventDefault()
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const obj = {}
        obj[name] = value;
        this.setState({
            extra_inputs: { ...obj}
        },() => {
            this.forceUpdate()
        });
    }


    async componentDidMount() {
        const metaData =   await getEvents();
        this.setState({
            userTypes: metaData.user_types,
            extra_text_inputs: metaData.extra_text_inputs
        });
    }


    handleSubmit = async (event) => {
        event.preventDefault()
        postEvent(this.buildRequest())
        // this.setState({isLoading: true}, async () => {
        //     this.setState({isLoading: false})
        // })
    }
    buildRequest() {

       let req =  { 
           
        }
        if(Object.keys(this.state.extra_inputs).length) {
            req = this.state.extra_inputs;
        }

        req = {
            ...req,
             first_name: this.state.FirstName,
            last_name: this.state.LastName,
            email: this.state.Email,
            type: this.state.user_types
        }
       console.log('req', req);
        return req;
    }
    handleChange(event) {
        const type= event.target.value;
        this.setState({
            user_types: type
        }, (state) => {
            this.forceUpdate()
        });

    }

   

    render() {
        const {isLoading, LastName, FirstName, Email , userTypes, extra_text_inputs, user_types} = this.state;

        return  (
            <div className={'form'}>
                <form  onSubmit={this.handleSubmit}>
                    <div className={'form-content'}>
                        <div className="form-item">
                            <label htmlFor="lastName" className="form-item-label">Last Name</label>
                            <input className="form-item-input" id="lastName"
                                   name="LastName"
                                   value={LastName}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="firstName" className="form-item-label">First Name</label>
                            <input className="form-item-input" id="firstName"
                                   name="FirstName"
                                   value={FirstName}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="Email" className="form-item-label">Email Address</label>
                            <input className="form-item-input" id="Email"
                                   name="Email"
                                   value={Email}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                        {userTypes &&
                            <UserType 
                                 userTypes = {userTypes}  
                                 extra_text_inputs= {extra_text_inputs} 
                                 user_types={user_types}
                                 handleChange={this.handleChange.bind(this)}
                                 handleInputChange = {this.handleExtraInputChange.bind(this)} />}
                    </div>
                    <div className={'buttons-row'}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            onClick={this.handleSubmit} 
                            disabled={isLoading}>
                                    Submit
                        </Button>
                    </div>
                </form>
            </div>
        ) ;
    }
}

export default CreateUser;

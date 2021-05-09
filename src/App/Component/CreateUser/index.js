import React, { Component } from 'react';
import { postEvent, getEvents } from "../../../api-service/api";
import UserType from '../UserType';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const useStyles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100vW',
        },
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

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
            extra_inputs: {},
            submitted: false
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
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
            extra_inputs: { ...obj }
        }, () => {
            this.forceUpdate()
        });
    }


    async componentDidMount() {
        const metaData = await getEvents();
        this.setState({
            userTypes: metaData.user_types,
            extra_text_inputs: metaData.extra_text_inputs
        });
    }


    handleSubmit = async (event) => {
        event.preventDefault()
        const data = await postEvent(this.buildRequest())
        if (data && Object.keys(data).length) {
            let { history } = this.props;
            history.push({
                pathname: '/confirmed-user',
                customNameData: data
            })
        }

    }
    buildRequest() {

        let req = {

        }
        if (Object.keys(this.state.extra_inputs).length) {
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
        const type = event.target.value;
        this.setState({
            user_types: type
        }, (state) => {
            this.forceUpdate()
        });

    }



    render() {
        const { isLoading, LastName, FirstName, Email, userTypes, extra_text_inputs, user_types } = this.state;
        const { classes } = this.props;
        return (

            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div>
                            {/* <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
                         */}
                                {/* <div className={'form-content'}> */}
                                <ValidatorForm
                                    className={classes.root} 
                                    autoComplete="off"
                                    onSubmit={this.handleSubmit}
                                    instantValidate={false}
                                >
                                <Grid item xs={12}>
                                <TextValidator
                                        id="lastName"
                                        label="Last Name"
                                        name="LastName"
                                        fullWidth="true"
                                        variant="outlined"
                                        value={LastName}
                                        validators={['required']}
                                        errorMessages={['Last Name is required']}
                                        onChange={this.handleInputChange} />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        id="firstName"
                                        label="First Name"
                                        name="FirstName"
                                        fullWidth="true"
                                        variant="outlined"
                                        value={FirstName}
                                        validators={['required']}
                                        errorMessages={['First Name is required']}
                                        onChange={this.handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        id="Email"
                                        label="Email"
                                        name="Email"
                                        fullWidth="true"
                                        variant="outlined"
                                        value={Email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['required field', 'invalid email']}
                                        onChange={this.handleInputChange} />
                                </Grid>
                                {userTypes &&
                                    <UserType
                                        userTypes={userTypes}
                                        extra_text_inputs={extra_text_inputs}
                                        user_types={user_types}
                                        handleChange={this.handleChange.bind(this)}
                                        handleInputChange={this.handleExtraInputChange.bind(this)} />}
                                {/* </div> */}
                                <div className={'buttons-row'}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        validators={['required']}
                                        disabled={isLoading}>
                                        Submit
                        </Button>
                                </div>
                                </ValidatorForm>
                        </div>
                    </Paper>
                </Grid>

            </React.Fragment>

        );
    }
}

export default withRouter(withStyles(useStyles)(CreateUser))

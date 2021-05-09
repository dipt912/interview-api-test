import React, { Component } from 'react';
import { postEvent, getEvents } from "../../../api-service/api";
import UserType from '../UserType';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { buildRequest } from '../../../utils';
import { useStyles } from './styles';


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
            submitted: false,
            isFailed: false
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
        const res = await postEvent(buildRequest(this.state))
        console.log('data', res);
        if (res.status === 'failed') {
            this.setState({ isFailed: true });
        } else if (res.status === 'success') {
            if (res.data && Object.keys(res.data).length) {
                let { history } = this.props;
                history.push({
                    pathname: '/confirmed-user',
                    customNameData: res.data
                })
            }
        }


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
        const { isLoading, LastName, FirstName, Email, userTypes, extra_text_inputs, user_types, isFailed } = this.state;
        const { classes } = this.props;
        return (

            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div>
                            <ValidatorForm
                                className={classes.root}
                                autoComplete="off"
                                onSubmit={this.handleSubmit}
                                instantValidate={false}
                            >
                                <Grid item xs={12} sm={6}
                                    className={classes.centerItem}>
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
                                <Grid item xs={12} sm={6}
                                    className={classes.centerItem}>
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
                                <Grid item xs={12} sm={6}  
                                     className={classes.centerItem}>
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
                                <Grid item xs={12} sm={6} className={classes.centerItem}>
                                {userTypes &&
                                    <UserType
                                        userTypes={userTypes}
                                        extra_text_inputs={extra_text_inputs}
                                        user_types={user_types}
                                        handleChange={this.handleChange.bind(this)}
                                        handleInputChange={this.handleExtraInputChange.bind(this)} />}
                                {/* </div> */}
                                </Grid>
                                <div className={'buttons-row'}  >
                                    {!isFailed ? <Button
                                    xs={12} sm={6}
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className={classes.button}
                                                    validators={['required']}
                                                    disabled={isLoading}>
                                                    Submit
                                                </Button> : (
                                                    <div>
                                                        <Button
                                                        xs={12} sm={6}
                                                            variant="contained"
                                                            color="danger"
                                                            type="submit"
                                                            className={classes.retry}
                                                            validators={['required']}
                                                            disabled={isLoading}>
                                                            Retry
                                                        </Button>
                                                        <Alert xs={12} sm={6} className={classes.alert} severity="error">Something went wrong. Please try after sometime</Alert>
                                                    </div>

                                        )}
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

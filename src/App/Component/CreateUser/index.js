import React, { Component } from 'react';
import { postEvent, getEvents } from "../../../api-service/api";
import UserType from '../UserType';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
            extra_inputs: {}
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
        postEvent(this.buildRequest())
        // this.setState({isLoading: true}, async () => {
        //     this.setState({isLoading: false})
        // })
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
                        <div className={'form'} >
                            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                {/* <div className={'form-content'}> */}
                                <Grid item xs={12}>
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        name="LastName"
                                        fullWidth="true"
                                        required="true"
                                        variant="outlined"
                                        value={LastName}
                                        onChange={this.handleInputChange} />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        name="FirstName"
                                        fullWidth="true"
                                        variant="outlined"
                                        required="true"
                                        value={FirstName}
                                        onChange={this.handleInputChange} />
                               </Grid>
                               <Grid item xs={12}>
                                    <TextField
                                        id="Email"
                                        label="Email"
                                        name="Email"
                                        fullWidth="true"
                                        variant="outlined"
                                        required="true"
                                        value={Email}
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
                                        onClick={this.handleSubmit}
                                        disabled={isLoading}>
                                        Submit
                        </Button>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </Grid>

            </React.Fragment>

        );
    }
}

export default withStyles(useStyles)(CreateUser)

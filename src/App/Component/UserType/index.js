import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



const useStyles = theme => ({
    formControl: {
        minWidth: 40,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        width: '96vW',
        color: theme.palette.text.secondary,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});
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
        console.log('name', name, value)
        this.setState({
            [name]: value
        });
        console.log('state', this.state)
        this.props.handleInputChange(event);
    }

    render() {
        const { userTypes, user_types, extra_text_inputs, handleChange } = this.props;
        const extraInput = extra_text_inputs[user_types];
        const { classes } = this.props;
        console.log("extraInput", extra_text_inputs)

        return (
            <Grid xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">User Types</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        fullWidth="true"
                        value={user_types}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {userTypes.map((ele, i) =>
                            <MenuItem
                                key={i}
                                value={ele}>
                                {ele}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                {extraInput && extraInput.length && (
                    extraInput.map((element) => {
                        return (
                            <Grid item xs={12}>
                                <TextValidator
                                    id={element.value}
                                    label={element.label}
                                    name={element.value}
                                    fullWidth="true"
                                    required="true"
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={[`${element.label} is required`]}
                                    value={this.state[element.value] || ''}
                                    onChange={this.handleExtraField.bind(this)} />
                            </Grid>
                        )
                    })
                )}
            </Grid>
        )
    }

}

// export default UserType;
export default withStyles(useStyles)(UserType)
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
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

class ConfirmedUser extends Component {
    constructor(props) {
        super(props);

    }
    redirectToHome(event) {
        event.preventDefault()
        let { history } = this.props;
        history.push('interview-api-test')
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>
                <span> <CheckCircleOutlineSharpIcon style={{fill: "green"}}/></span>
                <span>  User Successfully Created</span>
                   </h2>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.redirectToHome.bind(this)}
                >
                    Return Home
                        </Button>
            </div>

        )

    }
}


export default withRouter(withStyles(useStyles)(ConfirmedUser))
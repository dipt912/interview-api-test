

export const useStyles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100vW',
            justifyContent:  'center',
        },
    },

    paper: {
        padding: theme.spacing(2),
        justifyContent:  'center',
        color: theme.palette.text.secondary,
    },
    retry: {
        backgroundColor: 'red',
        color: 'white'
    },
    alert: {
        padding: theme.spacing(2),
        width: "90vW",
        marginTop: '10px'
    },
    centerItem : {
        margin: 'auto',
        marginTop: '20px',
    },
    button: {
        minWidth: "200px",
        margin: 'auto',
    }
});
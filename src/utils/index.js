export function buildRequest(state) {

    let req = {}
    if (Object.keys(state.extra_inputs).length) {
        req = state.extra_inputs;
    }
    req = {
        ...req,
        first_name: state.FirstName,
        last_name: state.LastName,
        email: state.Email,
        type:  state.user_types
    }
    return req;
}
import API from "./index";


export const getEvents = async () => {
    try {
        const res = await API.createRequest({
            url: '/user_create',
            method: 'GET'
        });
        return res.data;
    } catch (e) {
        console.log('getEvents error', e);
        throw e;
    }
};

export const postEvent = async (data) => {
    try {
        console.log("post ", data)
        const res = await API.createRequest({
            url: '/update_user',
            method: 'POST',
            data: data
        });

        return res.data
    } catch (e) {
        console.log('getEvents error', e);
        throw e;
    }
};



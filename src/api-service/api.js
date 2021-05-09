import API from "./index";
import api_constant from './api.constant'


export const getEvents = async () => {
    try {
        const res = await API.createRequest({
            url: api_constant.USER_CREATE,
            method: api_constant.GET
        });
        return res.data;
    } catch (e) {
        console.log('getEvents error', e);
        throw e;
    }
};

export const postEvent = async (data) => {
    try {
        const res = await API.createRequest({
            url: api_constant.UPDATE_USER,
            method: api_constant.POST,
            data: data
        });

        return {status: api_constant.SUCCESS,  data: res.data };
    } catch (e) {
        console.log('getEvents error', e);
        return { status: api_constant.FAILED}
    }
};



export const state = {
    index: 'index',
    alert: {
        message: '',
        type: '',
        duration: 4000,
        auto_hide: true,
        positionStyle: ''
    },
}

export const mutations = {
    notify(state, payload) {
        console.log(payload, 'pp')
        state.alert.message = payload.message;
        state.alert.type = payload.type;
        state.alert.duration = payload.duration;
        state.alert.auto_hide = payload.autoHide;
        state.alert.positionStyle = payload.positionStyle;
    }
}
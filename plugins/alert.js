export default ({app, store}, inject) => {
    inject('alert', {
        notify({message = '', type = 'success', duration = 4000, autoHide = true, positionStyle = ''}) {
            store.commit('notify', {message, type, duration, autoHide, positionStyle});
        }
    })
}
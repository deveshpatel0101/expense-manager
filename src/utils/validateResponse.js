export const validateResponse = (res) => {
    if (res.status !== 401) {
        return;
    }
    var token = prompt('You are unauthorized. Please enter your password');
    sessionStorage.setItem('token', token);
    window.location.reload();
};

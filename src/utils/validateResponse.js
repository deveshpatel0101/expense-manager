export const validateResponse = (res) => {
    if (res.status !== 401) {
        return;
    }
    sessionStorage.removeItem('token');
    window.location.reload();
};

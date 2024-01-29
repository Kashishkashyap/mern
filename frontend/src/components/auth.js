const headers = {
    'Content-Type': 'application/json',
};

const setAuthToken = (token) => {
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete headers['Authorization'];
    }
};

export { headers, setAuthToken };

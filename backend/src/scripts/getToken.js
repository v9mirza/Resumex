const axios = require('axios');

const login = async () => {
    try {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'v9mirza@gmail.com',
            password: '1234'
        });
        console.log('Token:', res.data.token);
        console.log('Role:', res.data.role);
    } catch (error) {
        console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
};

login();

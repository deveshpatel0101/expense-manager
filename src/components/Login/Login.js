import React from 'react';
import './Login.css';
import { Input, Button } from 'antd';
import { getTransactions } from '../../controllers/transactions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        };
    }

    handleChange = (e) => {
        const temp = e.target.value;
        this.setState({ password: temp });
    };

    handleSubmit = (e) => {
        sessionStorage.setItem('token', this.state.password);
        getTransactions();
        window.location.reload();
    };

    render() {
        return (
            <div className='Login-Container'>
                <h3>Authorize</h3>
                <Input.Password
                    value={this.state.password}
                    placeholder='Input Password'
                    onChange={this.handleChange}
                />
                <Button type='primary' onClick={this.handleSubmit}>
                    Submit
                </Button>
            </div>
        );
    }
}

export default Login;

import React from 'react';
import './DecryptForm.css';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';

import { decrypt } from '../../controllers/aes';
import { encryptedHexSecret } from '../../secret';
import { addKeys } from '../../redux/actions/keys';

class DecryptForm extends React.Component {
  state = {
    decryptKey: '',
  };

  handleKeyChange = (e) => {
    const temp = e.target.value;
    this.setState({ decryptKey: temp });
  };

  validatePassword = async (e) => {
    e.preventDefault();
    const userInput = e.target.password.value;
    const text = decrypt(userInput, encryptedHexSecret);
    this.setState({ decryptKey: '' });

    try {
      const jsonKey = JSON.parse(text);
      this.props.dispatch(
        addKeys({
          client_email: jsonKey.client_email,
          private_key: jsonKey.private_key,
        })
      );
      this.props.updatePassword(true);
    } catch (e) {
      alert('Invalid password! Please try again.');
    }
  };

  render() {
    return (
      <form
        className='Password-Form-Container'
        onSubmit={this.validatePassword}
      >
        <div className='Password-Input'>
          <Input.Password
            placeholder='Enter Decrypt Key'
            name='password'
            value={this.state.decryptKey}
            onChange={this.handleKeyChange}
          />
        </div>
        <div className='Submit-Form'>
          <Button
            type='primary'
            htmlType='submit'
            disabled={this.state.decryptKey.length !== 32}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (_) => {
  return {};
};

export default connect(mapStateToProps)(DecryptForm);

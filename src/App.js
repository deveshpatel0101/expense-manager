import React from 'react';
import './App.css';

import ExpenseManager from './components/ExpenseManager/ExpenseManager';
import DecryptForm from './components/DecryptForm/DecryptForm';

class App extends React.Component {
  state = {
    correctPassword: false,
  };

  updatePassword = (isValid) => {
    this.setState({ correctPassword: isValid });
  };

  render() {
    if (!this.state.correctPassword) {
      return (
        <div className='Wrapper'>
          <DecryptForm updatePassword={this.updatePassword} />
        </div>
      );
    } else {
      return (
        <div className='Wrapper'>
          <ExpenseManager />
        </div>
      );
    }
  }
}

export default App;

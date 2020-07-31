import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import UserForm from '@Components/UserForm';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };

    this.addNewUser = this.addNewUser.bind(this);
  }

  async addNewUser(user) {
    try {
      const { data } = await axios.post('/api/create', user);
      if (data) {
        // bug with linter when using literals
        Router.push('/user/' + data.id);
      }
    } catch (e) {
      this.setState({
        error: true,
      });
      console.log(e) // eslint-disable-line
    }
  }

  render() {
    const { error } = this.state;
    return (
      <>
        <Head>
          <title>HAUD Task- New User</title>
        </Head>
        <main>
          <h1>Add New User</h1>
          <UserForm
            submitFn={this.addNewUser}
          />
          {error && (
            <div>Something went wrong please try again!</div>
          )}
        </main>
      </>
    );
  }
}

export default NewUser;

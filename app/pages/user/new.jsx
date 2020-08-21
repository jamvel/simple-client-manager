import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import UserForm from '@Components/UserForm';

/**
 * User page for a new user
 * @component NewUser
 */
class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };

    this.addNewUser = this.addNewUser.bind(this);
  }

  /**
   * Function calls to api/create to create a new user
   * If the create is successful then the user is re-routed to the /user/:id page to display the data
   * @async
   * @function addNewUser
   * @param {object} user - The user object with all the data
   */
  async addNewUser(user) {
    try {
      const { data } = await axios.post('/api/create', user);
      if (data) {
        // bug with linter when using literals so used concat instead
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
          <title>New User</title>
        </Head>
        <main>
          <h1>Add New User</h1>
          {/* Pass the bound function addNewUser to the UserForm.
           Since this is a new user there is no need to pass user data from the store */}
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

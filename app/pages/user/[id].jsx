import React from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import PropTypes from 'prop-types';
import axios from 'axios';

import UserForm from '@Components/UserForm';

import { setUser } from '@Stores/app/actions';
import Wrapper from '@Stores';

import { connect } from 'react-redux';

/**
 * User page for an existing user
 * @component User
 */
class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };

    this.updateExistingUser = this.updateExistingUser.bind(this);
  }

  /**
   * Function calls api/update to request an update to the user data
   * If the update is successful then an action is dispatched to update the redux store with the user data
   * @async
   * @function updateExistingUser
   * @param {Object} user - The user object with all the data
   */
  async updateExistingUser(user) {
    const { updateUserRx } = this.props;
    try {
      const response = await axios.put('/api/update/' + user.id, user);
      if (response && response.status === 200) {
        alert('User was successfully updated');
        updateUserRx({ id: user.id, ...user });
      }
    } catch (e) {
      this.setState({
        error: true,
      });
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { error } = this.state;
    const { rxUser, id, error: notFoundError } = this.props;
    return (
      <>
        {/* if notFoundError is true (this.props.error) then the read request was a fail during getServerSideProps so display the Error Page */}
        {notFoundError && (
          <>
            <Head>
              <title>User not found</title>
            </Head>
            <ErrorPage statusCode={notFoundError.statusCode} />
          </>
        )}
        <Head>
          <title>User {id}</title>
        </Head>
        <main>
          <h1>Edit User</h1>
          {/* Pass the redux connected prop user and the bound function updateExistingUser to the UserForm */}
          <UserForm
            user={rxUser}
            submitFn={this.updateExistingUser}
          />
          {error && (
            <div>Something went wrong please try again!</div>
          )}
        </main>
      </>
    );
  }
}

User.propTypes = {
  id: PropTypes.string,
  updateUserRx: PropTypes.func.isRequired,
  rxUser: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
};

User.defaultProps = {
  id: '',
  rxUser: undefined,
  error: undefined,
};

/**
 * Next.js function that fetches data on each request
 * Wrapper is used to connect the function to the redux store
 * @function getServerSideProps
 */
export const getServerSideProps = Wrapper.getServerSideProps(
  async ({ store, res, query }) => {
    /** [id] request parameter is available under req.query.id (@link https://nextjs.org/docs/api-routes/dynamic-api-routes) */
    const { id } = query;
    try {
      const { data } = await axios.get(`/api/read/${id}`);
      store.dispatch(setUser({ id, ...data }));
    } catch (e) {
      const status = e.response ? e.response.status : 500;
      if (res) {
        res.statusCode = status;
      }

      return {
        props: {
          error: {
            statusCode: status,
            message: '',
          },
        },
      };
    }
  },
);

export default connect(
  state => ({ rxUser: state.user }),
  dispatch => ({
    updateUserRx: user => dispatch(setUser(user)),
  }),
)(User);

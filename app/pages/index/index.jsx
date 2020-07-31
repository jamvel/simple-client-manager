import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { connect } from 'react-redux';
import UserList from '@Components/UserList';

import { setUserList, deleteUser } from '@Stores/app/actions';
import Wrapper from '@Stores';

import style from './style.module.css';

/**
 * Index Page that shows the User list
 * @component Home
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Function calls api/delete to request a delete
   * If delete is successful a redux action is dispatched to remove the user from the store
   * @async
   * @function deleteUser
   * @param {string} id - The user id
   */
  async deleteUser(id) {
    const { deleteUserRx } = this.props;
    if (confirm('Are you sure you want to delete this user ?')) { // eslint-disable-line no-restricted-globals
      try {
        const response = await axios.delete('/api/delete/' + id);
        if (response && response.status === 200) {
          deleteUserRx(id);
          alert('User was successfully deleted');
        }
      } catch (e) {
        alert('Something went wrong whilst trying to delete the user');
      }
    }
  }

  render() {
    const { userList } = this.props;
    return (
      <>
        <Head>
          <title>HAUD Task- User List</title>
        </Head>
        <main>
          <div className={style.header}>
            <h1>HAUD TASK - User List</h1>
            <Link href="/user/new">
              <button
                type="button"
                className="btn btn-primary"
              >
                Add New User
              </button>
            </Link>
          </div>
          <UserList
            users={userList}
            deleteFn={this.deleteUser}
          />
        </main>
      </>
    );
  }
}

Home.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteUserRx: PropTypes.func.isRequired,
};

/**
 * Next.js function that fetches data on each request
 * Wrapper is used to connect the function to the redux store
 * @function getServerSideProps
 */
export const getServerSideProps = Wrapper.getServerSideProps(
  async ({ store, res }) => {
    try {
      // fetch all users through the api and dispatch a redux action to update the state
      const { data } = await axios.get('/api/read-all');
      store.dispatch(setUserList(data));
    } catch (e) {
      // if api call was not successful forward the response status to the page
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
  state => state,
  dispatch => ({
    deleteUserRx: id => dispatch(deleteUser(id)),
  }),
)(Home);

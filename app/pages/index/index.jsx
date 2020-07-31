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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }

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

export const getServerSideProps = Wrapper.getServerSideProps(
  async ({ store, res }) => {
    try {
      const { data } = await axios.get('/api/read-all');
      store.dispatch(setUserList(data));
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
  state => state,
  dispatch => ({
    deleteUserRx: id => dispatch(deleteUser(id)),
  }),
)(Home);

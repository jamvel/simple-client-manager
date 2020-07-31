/* eslint-disable */
import React from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import axios from 'axios';

import UserForm from '@Components/UserForm';

import { setUser } from '@Stores/app/actions';
import Wrapper from '@Stores';

import { connect } from 'react-redux';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };

    this.updateExistingUser = this.updateExistingUser.bind(this);
  }

  async updateExistingUser(user) {
    const { updateUserRx } = this.props;
    console.log(user) // eslint-disable-line
    try {
      const response = await axios.put('/api/update/' + user.id, user);
      if(response && response.status === 200){
        alert('User was successfully updated')
        updateUserRx({ id: user.id, ...user });
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
    const { rxUser } = this.props;
    return (
      <>
        {this.props.error && (
          <>
            <Head>
              <title>HAUD Task- User not found</title>
            </Head>
            <ErrorPage statusCode={this.props.error.statusCode} />
          </>
        )}
        <Head>
          <title>HAUD Task- User {this.props.id}</title>
        </Head>
        <main>
          <h1>Edit User</h1>
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

export const getServerSideProps = Wrapper.getServerSideProps(
  async ({ store, res, query }) => {
    const id = query.id;
    try {
      const { data } = await axios.get(`/api/read/${id}`)
      store.dispatch(setUser({ id, ...data }));
      
    } catch(e) {
      const status = e.response ? e.response.status : 500;
      if(res){
        res.statusCode = status;
      }
    
      return {
        props: {
          error: {
            statusCode: status,
            message: '',
          }
        }
      };
    }
  }
)
export default connect(
  state => ({ rxUser: state.user }),
  dispatch => ({
    updateUserRx: user => dispatch(setUser(user))
  })
)(User)
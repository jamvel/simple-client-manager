import PropTypes from 'prop-types';
import UserListCard from '@Components/UserListCard';
import style from './style.module.css';

const UserList = ({ users }) => (
  <>
    {users && Array.isArray(users) && users.length > 0 && (
      <div className={style.listParent}>
        {users.map((user) => (
          <UserListCard
            key={user.id}
            {...user}
          />
        ))}
      </div>
    )}
  </>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UserList;

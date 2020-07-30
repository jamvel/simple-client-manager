import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import UserListCard from '@Components/UserListCard';
import style from './style.module.css';

const UserList = ({ users, deleteFn }) => {
  const router = useRouter();
  return (
    <>
      {users && Array.isArray(users) && users.length > 0 && (
        <div className={style.listParent}>
          {users.map((user) => (
            <UserListCard
              key={user.id}
              user={user}
              editFn={() => router.push(`/user/${user.id}`)}
              deleteFn={() => deleteFn(user.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteFn: PropTypes.func.isRequired,
};

export default UserList;

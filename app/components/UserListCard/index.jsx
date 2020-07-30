import PropTypes from 'prop-types';
import style from './style.module.css';

const UserListCard =
({ user, editFn, deleteFn }) => (
  <div className={style.cardParent}>
    <div className={style.cardUser}>
      <span>
        {user.name}&nbsp;{user.surname}
      </span>
      <div>
        <span>{user.address1}</span>
        <span>{user.address2}</span>
      </div>
      <div>
        <span>{user.town}</span>
        <span>{user.region}</span>
        <span>{user.country}</span>
        <span>{user.postCode}</span>
      </div>
      <div>
        <span>{user.contact}</span>
      </div>
    </div>
    <div className={style.buttonsParent}>
      <button type="button" onClick={() => editFn()}>Edit</button>
      <button type="button" onClick={() => deleteFn(user.id)}>Delete</button>
    </div>
  </div>
);

UserListCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired,
  editFn: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
};

export default UserListCard;

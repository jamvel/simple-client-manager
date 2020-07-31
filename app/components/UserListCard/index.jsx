import PropTypes from 'prop-types';
import style from './style.module.css';

/**
 * User Card to be display user data
 * @component
 * @function UserListCard
 * @param {Object} user - The user object with data
 * @param {editFn} callback - Function to call when the edit button is clicked
 * @param {deleteFn} callback - Function to call when the delete button is clicked
 */
const UserListCard = ({ user, editFn, deleteFn }) => (
  <div className={style.cardParent}>
    <div className={style.cardUser}>

      <div className={style.row1}>
        {user.name}&nbsp;{user.surname}
      </div>

      <div className={style.row2}>
        <span><span className={style.label}>Address 1</span>{user.address1}</span>
        <span><span className={style.label}>Address 2</span>{user.address2 || '-'}</span>
      </div>

      <div className={style.row3}>
        <span><span className={style.label}>Town</span>{user.town}</span>
        <span><span className={style.label}>Region</span>{user.region || '-'}</span>
        <span><span className={style.label}>Country</span>{user.country}</span>
        <span><span className={style.label}>Post Code</span>{user.postCode}</span>
      </div>

      <div className={style.row4}>
        <span><span className={style.label}>Contact Number</span>{user.contact}</span>
      </div>
    </div>

    <div className={style.buttonsParent}>
      <button type="button" className="btn btn-edit" onClick={() => editFn()}>Edit</button>
      <button type="button" className="btn btn-delete" onClick={() => deleteFn(user.id)}>Delete</button>
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

import PropTypes from 'prop-types';
import style from './style.module.css';

const UserListCard =
({ name, surname, address1, address2, town, region, country, postCode, contact }) => (
  <div className={style.cardParent}>
    <div className={style.cardUser}>
      <span>
        {name}&nbsp;{surname}
      </span>
      <div>
        <span>{address1}</span>
        <span>{address2}</span>
      </div>
      <div>
        <span>{town}</span>
        <span>{region}</span>
        <span>{country}</span>
        <span>{postCode}</span>
      </div>
      <div>
        <span>{contact}</span>
      </div>
    </div>
    <div className={style.buttonsParent}>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>
  </div>
);

UserListCard.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string,
  town: PropTypes.string.isRequired,
  region: PropTypes.string,
  country: PropTypes.string.isRequired,
  postCode: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
};

UserListCard.defaultProps = {
  address2: '',
  region: '',
};

export default UserListCard;

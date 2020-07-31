import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useValidateData from '@Hooks/useValidateData';
import style from './style.module.css';

/**
 * User List component that displays UserListCard components
 * @component
 * @function UserForm
 * @param {Object} users - User object with data
 * @param {submitFn} callback - Function to call when the submit button is clicked
 */
const UserForm = ({ user, submitFn }) => {
  const [allValues, setAllValues] = useState({
    name: '',
    surname: '',
    address1: '',
    address2: '',
    town: '',
    region: '',
    country: '',
    postCode: '',
    contact: '',
  });

  // use useValidateData custom hook
  const validData = useValidateData(allValues);

  /**
   * Checks validData (from useValidateData hook) to see if all the values in the object are true
   * @function dataIsValid
   * @returns {boolean}
   */
  const dataIsValid = () => Object.values(validData).every(x => x === true);

  /**
   * Returns color depending on value of param
   * @function getBorderColor
   * @param {boolean} valid
   * @returns {string}
   */
  const getBorderColor = valid => (valid ? 'grey' : 'red');

  // useEffect hook to populate data on mount
  useEffect(() => {
    if (user) {
      setAllValues({ ...user });
    }
  }, [setAllValues]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function to call to handle change in form
   * @function handleChange
   * @param {Object} e - Event object
   */
  const handleChange = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  return (
    <form className={style.form}>
      <div className={style.row}>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={allValues.name || ''}
              onChange={handleChange}
              style={{ borderColor: getBorderColor(validData.name) }}
            />
          </label>
        </div>

        <div>
          <label>
            Surname
            <input
              type="text"
              name="surname"
              value={allValues.surname || ''}
              onChange={handleChange}
              style={{ borderColor: getBorderColor(validData.surname) }}
            />
          </label>
        </div>
      </div>

      <label>
        Address 1
        <input
          type="text"
          name="address1"
          value={allValues.address1 || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.address1) }}
        />
      </label>

      <label>
        Address 2
        <input
          type="text"
          name="address2"
          value={allValues.address2 || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.address2) }}
        />
      </label>

      <label>
        Town
        <input
          type="text"
          name="town"
          value={allValues.town || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.town) }}
        />
      </label>

      <label>
        Region
        <input
          type="text"
          name="region"
          value={allValues.region || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.region) }}
        />
      </label>

      <label>
        Country
        <input
          type="text"
          name="country"
          value={allValues.country || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.country) }}
        />
      </label>

      <label>
        Post Code
        <input
          type="text"
          name="postCode"
          value={allValues.postCode || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.postCode) }}
        />
      </label>

      <label>
        Contact Number
        <input
          type="text"
          name="contact"
          value={allValues.contact || ''}
          onChange={handleChange}
          style={{ borderColor: getBorderColor(validData.contact) }}
        />
      </label>

      <div className={style.buttonsParent}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (dataIsValid() ? submitFn(allValues) : alert('Error: Please check your input'))}
        >
          Save
        </button>
        <Link href="/">
          <button className="btn btn-cancel" type="button">Go Back</button>
        </Link>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    town: PropTypes.string,
    region: PropTypes.string,
    country: PropTypes.string,
    postCode: PropTypes.string,
    contact: PropTypes.string,
  }),
  submitFn: PropTypes.func,
};

UserForm.defaultProps = {
  user: {},
  submitFn: () => {},
};

export default UserForm;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import style from './style.module.css';

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

  useEffect(() => {
    if (user) {
      setAllValues({ ...user });
    }
  }, [setAllValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  return (
    <form className={style.form}>
      <div className={style.row}>
        <div>
          <label>
            Name
            <input type="text" name="name" value={allValues.name || ''} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Surname
            <input type="text" name="surname" value={allValues.surname || ''} onChange={handleChange} />
          </label>
        </div>
      </div>

      <label>
        Address 1
        <input type="text" name="address1" value={allValues.address1 || ''} onChange={handleChange} />
      </label>

      <label>
        Address 2
        <input type="text" name="address2" value={allValues.address2 || ''} onChange={handleChange} />
      </label>

      <label>
        Town
        <input type="text" name="town" value={allValues.town || ''} onChange={handleChange} />
      </label>

      <label>
        Region
        <input type="text" name="region" value={allValues.region || ''} onChange={handleChange} />
      </label>

      <label>
        Country
        <input type="text" name="country" value={allValues.country || ''} onChange={handleChange} />
      </label>

      <label>
        Post Code
        <input type="text" name="postCode" value={allValues.postCode || ''} onChange={handleChange} />
      </label>

      <label>
        Contact Number
        <input type="text" name="contact" value={allValues.contact || ''} onChange={handleChange} />
      </label>

      <div>
        <button type="button" onClick={() => submitFn(allValues)}>Save</button>
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

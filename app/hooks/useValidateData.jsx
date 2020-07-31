import { useEffect, useState } from 'react';

const useValidateData = ({ name, surname, address1, address2, town, region, country, postCode, contact }) => { // eslint-disable-line max-len
  const [validName, setValidName] = useState(false);
  const [validSurname, setValidSurname] = useState(false);
  const [validAddress1, setValidAddress1] = useState(false);
  const [validAddress2, setValidAddress2] = useState(false);
  const [validTown, setValidTown] = useState(false);
  const [validRegion, setValidRegion] = useState(false);
  const [validCountry, setValidCountry] = useState(false);
  const [validPostCode, setValidPostCode] = useState(false);
  const [validContact, setValidContact] = useState(false);

  useEffect(() => {
    if (name === undefined || name.length < 1 || name.length > 30) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  }, [name]);

  useEffect(() => {
    if (surname === undefined || surname.length < 1 || surname.length > 30) {
      setValidSurname(false);
    } else {
      setValidSurname(true);
    }
  }, [surname]);

  useEffect(() => {
    if (address1 === undefined || address1.length < 1 || address1.length > 50) {
      setValidAddress1(false);
    } else {
      setValidAddress1(true);
    }
  }, [address1]);

  useEffect(() => {
    if (address2 && address2.length > 50) {
      setValidAddress2(false);
    } else {
      setValidAddress2(true);
    }
  }, [address2]);

  useEffect(() => {
    if (town === undefined || town.length < 1 || town.length > 50) {
      setValidTown(false);
    } else {
      setValidTown(true);
    }
  }, [town]);

  useEffect(() => {
    if (region !== undefined && region.length > 50) {
      setValidRegion(false);
    } else {
      setValidRegion(true);
    }
  }, [region]);

  useEffect(() => {
    if (country === undefined || country.length < 1 || country.length > 50) {
      setValidCountry(false);
    } else {
      setValidCountry(true);
    }
  }, [country]);

  useEffect(() => {
    if (postCode === undefined || postCode.length < 1 || postCode.length > 12) {
      setValidPostCode(false);
    } else {
      setValidPostCode(true);
    }
  }, [postCode]);

  useEffect(() => {
    if (contact === undefined || contact.length < 1 || contact.length > 16 || contact.length < 6 || !new RegExp('^[0-9]+$').test(contact)) {
      setValidContact(false);
    } else {
      setValidContact(true);
    }
  }, [contact]);

  return {
    name: validName,
    surname: validSurname,
    address1: validAddress1,
    address2: validAddress2,
    town: validTown,
    region: validRegion,
    country: validCountry,
    postCode: validPostCode,
    contact: validContact,
  };
};

export default useValidateData;

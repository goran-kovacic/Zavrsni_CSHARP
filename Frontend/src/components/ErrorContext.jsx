import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [prikaziErrorModal, setPrikaziErrorModal] = useState(false);

  function prikaziError(errorsMessage) {
    setErrors(errorsMessage);
    setPrikaziErrorModal(true);
  }

  function sakrijError() {
    setErrors([]);
    setPrikaziErrorModal(false);
  }

  return (
    <ErrorContext.Provider
      value={{ errors, prikaziErrorModal, prikaziError, sakrijError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
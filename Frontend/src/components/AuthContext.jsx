import { createContext, useEffect, useState } from 'react';
import { logInService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';
import useError from '../hooks/useError';
import useLoading from '../hooks/useLoading';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const { showLoading, hideLoading } = useLoading();

  const { prikaziError } = useError();
  const navigate = useNavigate();

  // useEffect hook na ovaj način koristimo da prilikom prve inicijalizacije
  // provjerimo postoji li bearer token u local storageu i ako postoji ,
  // automatski ulogiramo korisnika. Također ako bearer token ne postoji ,
  // u else dijelu štitimo aplikaciju tako da korisnik ne može pristupiti zaštićenim rutama
  useEffect(() => {
    const token = localStorage.getItem('Bearer');

    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } else {
      navigate(RouteNames.HOME);
    }
  }, []);

  async function login(userData) {
    showLoading();
    const odgovor = await logInService(userData);
    hideLoading();
    if (odgovor.ok) {
      localStorage.setItem('Bearer', odgovor.podaci);
      setAuthToken(odgovor.podaci);
      setIsLoggedIn(true);
      navigate(RouteNames.NADZORNA_PLOCA);
    } else {
      console.log()
      prikaziError(odgovor.podaci);
      localStorage.setItem('Bearer', '');
      setAuthToken('');
      setIsLoggedIn(false);
      //navigate(RoutesNames.HOME);
    }
  }

  function logout() {
    localStorage.setItem('Bearer', '');
    setAuthToken('');
    setIsLoggedIn(false);
    navigate(RouteNames.HOME);
  }

  const value = {
    isLoggedIn,
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
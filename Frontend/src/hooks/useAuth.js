import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth se mora koristiti unutar AuthProvider-a');
  }

  return context;
}
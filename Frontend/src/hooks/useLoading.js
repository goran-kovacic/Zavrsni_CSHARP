
import { useContext } from 'react';
import { LoadingContext } from '../components/LoadingContext';

export default function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading se mora koristiti unutar LoadingProvidera-a');
  }

  return context;
}

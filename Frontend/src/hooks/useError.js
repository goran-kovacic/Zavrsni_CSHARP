import { useContext } from 'react';
import { ErrorContext } from '../components/ErrorContext';

export default function useError(){
    const context = useContext(ErrorContext);

    if(!context) {
        throw new Error('useError se mora koristiti unutar ErrorProvider-a');
    }
    return context;
}
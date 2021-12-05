import { useContext } from 'react';
import AuthContext from './context';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context){
    throw new Error('use auth context inside provider!');
  }
  return context;
};

export default useAuthContext;
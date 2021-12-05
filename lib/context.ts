import { User } from 'firebase/auth';
import { createContext } from 'react';

const AuthContext = createContext<{ user: User | null, username: string | null }>({ user: null, username: null });
export default AuthContext;
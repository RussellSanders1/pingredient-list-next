import { User } from 'firebase/auth';
import { createGenericContext } from './useGenericContext';

export const [useUserContext, UserContextProvider] = createGenericContext<{ user: User, username: string }>();
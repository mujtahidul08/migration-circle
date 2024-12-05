import React, { createContext, useState } from 'react';

type UserType = {
  name: string;
  email: string;
  password: string;
};

export type UserContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

export const UserContext = createContext<UserContextType>({
  user: { name: '', email: '', password: '' },
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    name: 'mujtahidul',
    email: 'mujtahidul@gmail.com',
    password: '123',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

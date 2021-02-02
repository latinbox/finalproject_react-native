import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext();
const UserHandler = ({children}) => {
  const [name, updateName] = useState('');
  const [email, updateEmail] = useState('');
  const [telefono, updateTelefono] = useState('');
  const [photo, updatePhoto] = useState(null);

  return (
    <UserContext.Provider
      value={{
        name,
        updateName,
        email,
        updateEmail,
        telefono,
        updateTelefono,
        photo,
        updatePhoto,
      }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserHandler;

type IUser = {
  name?: String,
  updateName?: Function,
  email?: String,
  updateEmail?: Function,
  telefono?: Integer,
  updateTelefono?: Function,
  photo?: String,
  updatePhoto?: Function,
};
export const useUserInformation = (): IUser => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserInformation debe ser usado dentro de UserHandler');
  }

  return context;
};

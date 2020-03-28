import React, { useContext } from 'react';

import { FirebaseUserContext } from '@src/contexts';

const AuthButton = ({ onLogin, onLogout, loading }) => {
  const user = useContext(FirebaseUserContext);

  return user ? (
    <button onClick={onLogout} disabled={loading}>
      Logout
    </button>
  ) : (
    <button onClick={onLogin} disabled={loading}>
      Login with Facebook
    </button>
  );
};

export default AuthButton;

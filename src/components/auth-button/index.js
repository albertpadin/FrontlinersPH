import React, { useContext } from 'react';
import { Button } from 'reactstrap';

import { FirebaseUserContext } from '@src/contexts';

const AuthButton = ({ onLogin, onLogout, loading }) => {
  const user = useContext(FirebaseUserContext);

  return user ? (
    <Button color="primary" onClick={onLogout} disabled={loading}>
      Logout
    </Button>
  ) : (
    <Button color="primary" onClick={onLogin} disabled={loading}>
      Login with Facebook
    </Button>
  );
};

export default AuthButton;

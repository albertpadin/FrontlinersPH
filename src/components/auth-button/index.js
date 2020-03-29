import React from 'react';
import { Button } from 'reactstrap';

import useFirebaseUser from '@hooks/use-firebase-user';

const AuthButton = ({ onLogin, onLogout, loading }) => {
  const user = useFirebaseUser();

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

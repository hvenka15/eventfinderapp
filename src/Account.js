import React, { useState } from 'react';
import { useAuthAtom } from "./sharedAtomVariables";
import { AccountSettings, Button, View } from '@aws-amplify/ui-react';

export function Account() {
  const [auth] = useAuthAtom();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const changePassword = () => {
    const handleSuccess = () => {
      alert('Password is successfully changed!');
      setShowChangePassword(false); 
    }
    
    return (
      <AccountSettings.ChangePassword onSuccess={handleSuccess} />
    );
  }

  return (
    <View>
      <p>Current Account: {auth.user?.signInDetails?.loginId}</p>
      <Button onClick={() => setShowChangePassword(!showChangePassword)}>
        {showChangePassword ? "Cancel" : "Change Password"}
      </Button>
      {showChangePassword && changePassword()}
    </View>
  );
}

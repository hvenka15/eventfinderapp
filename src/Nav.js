import { Flex, Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useAuthAtom } from "./sharedAtomVariables";

export function Nav() {
  const [auth] = useAuthAtom();
  const navigate = useNavigate();

  return (
    <Flex justifyContent="space-between" alignItems="center" padding="1rem">
      <Flex>
        <Button onClick={() => navigate("/home")} variation="link" style={{ marginRight: '1rem' }}>
          Home
        </Button>
        <Button onClick={() => navigate("/explore")} variation="link" style={{ marginRight: '1rem' }}>
          Explore
        </Button>
        <Button onClick={() => navigate("/history")} variation="link" style={{ marginRight: '1rem' }}>
          History
        </Button>
        <Button onClick={() => navigate("/account")} variation="link">
          Account
        </Button>
      </Flex>
      
      <Button onClick={auth.signOut} variation="primary">
        Sign Out
      </Button>
    </Flex>
  );
}

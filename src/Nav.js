import { Flex, Button } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";
import { useAuthAtom } from "./sharedAtomVariables";

export function Nav() {
  const [auth] = useAuthAtom();
  return (
    <Flex>
      <NavLink variation="link" to="/home">
        Home
      </NavLink>
      <NavLink variation="link" to="/explore">
        Explore
      </NavLink>
      <NavLink variation="link" to="/history">
        History
      </NavLink>

      <NavLink variation="link" marginLeft={"auto"} onClick={auth.signOut} to="/history">
        signOut
      </NavLink>

      <NavLink variation="link" to="/account">
        Account
      </NavLink>
    </Flex>
  );
}

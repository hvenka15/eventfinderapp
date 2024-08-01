import { useAuthAtom } from "./sharedAtomVariables";

export function Account() {
  const [auth] = useAuthAtom();
  return <>Account page username {auth.user?.signInDetails?.loginId}</>;
}

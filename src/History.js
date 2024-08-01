import { useAuthAtom } from "./sharedAtomVariables";

export function History() {
  const [auth] = useAuthAtom();
  return <>Account page username {auth.user?.signInDetails?.loginId}</>;
}

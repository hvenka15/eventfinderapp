import { useAuthAtom } from "./sharedAtomVariables";

export function History() {
  const [auth] = useAuthAtom();
  return <>History Page</>;
}

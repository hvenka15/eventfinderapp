// create atomVariables that can be used in other components

import { atom, useAtom } from "jotai";

export const authAtomVb = atom({
  user: /** @type {import("aws-amplify/auth").AuthUser|null} */ (null),
  signOut: () => ({}),
});

export const useAuthAtom = () => useAtom(authAtomVb);

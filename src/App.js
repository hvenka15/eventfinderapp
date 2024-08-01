import { Authenticator, Flex, Link, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "./aws-exports.js";
import { useAuthAtom } from "./sharedAtomVariables.js";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Nav } from "./Nav.js";
import { Footer } from "./Footer.js";
import { Home } from "./Home.js";
import { History } from "./History.js";
import { Account } from "./Account.js";
import { Explore } from "./Explore.js";

Amplify.configure(outputs);

function Layout() {
  return (
    <Flex direction={"column"} padding={10} height={"100%"} className="root-layout">
      <Nav />
      <View as={"main"} flex={"1 1 auto"}>
        <Outlet />
      </View>
      <Footer />
    </Flex>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={"/home"} /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/account", element: <Account /> },
      { path: "/history", element: <History /> },
    ],
  },
]);

export default function App({ user }) {
  const [auth, setAuth] = useAuthAtom();
  return (
    <View margin={"auto"} className="app-authenticator" display={"grid"} height={"100%"}>
      <Authenticator>
        {({ signOut, user }) => {
          if (user && !auth.user) {
            setAuth({ user, signOut });
            console.log("fired.updateuser", { auth, user });
          }

          if (!user && auth.user) {
            setAuth({ user, signOut: () => ({}) });
          }
          return <RouterProvider router={router} />;
        }}
      </Authenticator>
    </View>
  );
}

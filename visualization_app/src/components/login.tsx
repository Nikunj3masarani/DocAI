import * as React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Icon from "../components/icons";
import { appContext } from "../hooks/provider";
import { navigate } from "gatsby";
import { getCookie, setCookie } from "./utils";

// markup
const LoginView = ({ meta }: any) => {
  const windowAvailable = typeof window !== "undefined";

  const clientId = process.env.GATSBY_GIT_CLIENT_ID;
  const serverUrl = process.env.GATSBY_API_URL;
  const pageUrl = windowAvailable
    ? window.location.protocol + "//" + window.location.host
    : "";
  const redirectUri = pageUrl + "/login";

  // console.log(redirectUri);

  const gitAuthUrl =
    "https://github.com/login/oauth/authorize?client_id=" +
    clientId +
    "&redirect_uri=" +
    redirectUri +
    "&scope=repo";
  const tokenUrl = serverUrl + "auth/github/token";

  const [authStatus, setAuthStatus] = React.useState<{
    [fieldName: string]: string;
  }>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  // console.log(appContext.user);

  const { user, setUser, cookie_name } = React.useContext(appContext);

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  function login() {
    if (windowAvailable) {
      window.open(gitAuthUrl, "_self");
    }
  }

  function clearQueryParams() {
    // console.log("clearQueryParams");
    history.replaceState({ foo: "bar" }, "Login Page", pageUrl + "/#");
  }

  function getAuthToken(code: string | null, token: string | null) {
    setLoading(true);
    fetch(tokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, token: token }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setCookie(cookie_name, data.access_token, 2);
          setUser(data);
          clearQueryParams();
        } else {
          setAuthStatus(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setAuthStatus({
          status: "error",
          statusText: "Error connecting to auth server.",
        });
        setLoading(false);
      });
  }

  React.useEffect(() => {
    const code = windowAvailable
      ? new URLSearchParams(window.location.search).get("code")
      : null; // id=123
    const access_token = getCookie(cookie_name);
    if (access_token) {
      getAuthToken(code, access_token);
    }
    if (code) {
      getAuthToken(code, null);
    }
  }, []);
  const authError = authStatus.status === "error";
  const authColor = authError ? "orange" : "green";
  const authTextColor = "text-" + authColor + "-500";
  const authBorderColor = "border-" + authColor + "-500";

  return (
    <main className=" ">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" mx-auto block   w-full  h-12  text-center text-green-600">
            <Icon icon="app" size={12} />
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            {meta?.title}{" "}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {meta?.description}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Sign in with Github
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    login();
                  }}
                  type="submit"
                  className="w-full mt-4 flex justify-center py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg
                    className="w-5 h-5 mr-4 "
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign in
                </button>

                {authStatus.status && (
                  <div
                    className={
                      authTextColor +
                      " " +
                      authBorderColor +
                      "  mt-3 border p-2 rounded text-sm "
                    }
                  >
                    <ExclamationTriangleIcon
                      className={authTextColor + " h-5 w-5 inline-block mr-2 "}
                    />
                    {authStatus.statusText}{" "}
                  </div>
                )}

                {loading && (
                  <div className="mt-4 p-3 text-sm border border-green-500 rounded">
                    {" "}
                    <span className="inline-block text-gray-500  mr-2">
                      <Icon icon="loading" size={4} />
                    </span>{" "}
                    Signing in ...{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginView;

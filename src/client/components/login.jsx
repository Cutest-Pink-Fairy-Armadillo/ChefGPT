import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = ({ setFridge, setLoggedIn, setUserId }) => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setUser(codeResponse);
      // console.log(codeResponse.authuser);
      try {
        const res = await axios.post("/api/user", {
          userId: codeResponse.authuser,
        });
        setUserId(codeResponse.authuser);
        setLoggedIn(true);
        setFridge(res.data.userDoc.ingredients);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setLoggedIn(false);
    setUserId(null);
  };

  return (
    <div className="profile-box">
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <p>{profile.name}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()} className="login-with-google-btn">
          Sign in with Google
        </button>
      )}
    </div>
  );
};
export default Login;

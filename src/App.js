import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { Button, makeStyles, Input } from "@material-ui/core";
import { auth } from "./firebase";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        setUserName(authUser.displayName);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
    auth.signOut();
    alert("Register success, Sign In");
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);
        setUserName(user.username);
      })
      .catch((e) => alert(e.message));
    setOpenSignIn(false);
  };

  const signOut = () => {
    auth.signOut();
    setUser(null);
    setUserName("");
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.transparentpng.com/thumb/logo-instagram/z75gfy-instagram-logo-png.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button type="submit" onClick={signUp}>
              SignUp
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.transparentpng.com/thumb/logo-instagram/z75gfy-instagram-logo-png.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.transparentpng.com/thumb/logo-instagram/z75gfy-instagram-logo-png.png"
          alt=""
        />
        {user && username ? <h3>{username}</h3> : ""}
        {user && username ? (
          <Button onClick={signOut}>Sign Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className={`app__post ${user && "app__post__bottom"}`}>
        <div className="app_postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              username={post.username}
              imageUrl={post.imageUrl}
              caption={post.caption}
              user={user}
            />
          ))}
        </div>
        {/* <div className="app__postRight">
          If insta acc is public, it shows the profile
          <InstagramEmbed
            url="https://www.instagram.com/p/CByOEtMhNRz/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div> */}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className="app__sign__upload">Sign In to Upload🔥🔥🔥</h3>
      )}
    </div>
  );
}

export default App;

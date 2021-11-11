import { useEffect, useState } from "react";
import "./App.css";
const API = "https://jsonplaceholder.typicode.com";

function App() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme", "light")
  );
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [id, setId] = useState([0]);
  const [comment_Id, setComment_Id] = useState([0]);
  
  
  const changeTheme = (evt) => {
    setTheme(evt.target.value)
    window.localStorage.setItem("theme", evt.target.value)
  }

  // ============ HERE CALLED USERS API ===========
  useEffect(() => {
    fetch(`${API}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // ============ HERE CALLED USERS POSTS API ===========
  useEffect(() => {
    fetch(`${API}/posts?userId=${id }`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [id]);

  let findPost = (post) => {
    setId(post.target.dataset.id);
  };

  useEffect(() => {
    fetch(`${API}/comments?postId=${comment_Id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [comment_Id]);

  let findComment = (comment) => {
    setComment_Id(comment.target.dataset.id);
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div>
          {users.length > 0 && (
              <ul className="users-list">
                {users.map((user) => {
                  return (
                    <li className={theme} key={user.id}>
                      <span
                        className="avatar"
                        data-id={user.id}
                        onClick={findPost}
                      >
                        {user.username[0]}
                      </span>
                      <p className="user-username">{user.username}</p>
                      <p className="user-name">{user.name}</p>
                      <a className="user-email" href="mailto">
                        {user.email}
                      </a>
                      <button
                        className="user-btn"
                        data-id={user.id}
                        onClick={findPost}
                      >
                        View post
                      </button>
                    </li>
                  );
                })}
              </ul>
          )}
          </div>

          {posts.length > 0 && (
            <ul className="users-list">
              {posts.map((post) => {
                return (
                  <li className={theme} key={post.id}>
                    <p className="post-name">{post.title}</p>
                    <p className="post-body">{post.body}</p>
                    <button
                      className="post-btn"
                      data-id={post.id}
                      onClick={findComment}
                    >
                      View Comments
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {comments.length > 0 && (
            <ul className="users-list">
              {comments.map((comment) => {
                return (
                  <li className={theme} key={comment.id}>
                    <p className="commnet-name">{comment.name}</p>
                    <p className="commnet-text">{comment.body}</p>
                  </li>
                );
              })}
            </ul>
          )}
          <select onChange={changeTheme} className="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;

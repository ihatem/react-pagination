import React, { useState, useEffect, useContext } from "react";
import { Context } from "./context";
import { Card, Spinner } from "react-bootstrap";

const chunk = (array, size) => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};

const Posts = props => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useContext(Context);
  const [postsLoading, setPostsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  const pageNum = props.match.params.pageNum;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        setState({
          totalPages: Math.floor(json.length / 10),
          totalPosts: json.length
        });
        setPosts(chunk(json, Math.floor(json.length / 10)));
        setPostsLoading(false);
      });

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => {
        setUsers(json);
        setUsersLoading(false);
      });
  }, []);

  return (
    <div className="row d-flex flex-column align-items-center posts">
      {!postsLoading ? (
        posts[pageNum - 1].map(({ id, userId, title, body }) => {
          return (
            <Card
              className="col-md-6"
              key={id}
              bg="light"
              style={{ padding: 0, marginBottom: "30px" }}
            >
              <Card.Header>
                <h5 style={{ margin: 0 }}>{title}</h5>
              </Card.Header>
              <Card.Body>
                <Card.Text>{body}</Card.Text>
                {!usersLoading ? (
                  <Card.Link
                    href={`mailto:${
                      users.find(user => user.id === userId).email
                    }`}
                  >
                    {users.find(user => user.id === userId).name}
                  </Card.Link>
                ) : (
                  <Spinner animation="border" />
                )}
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default Posts;

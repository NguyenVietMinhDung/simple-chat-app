import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/comments')
      .then(res => setComments(res.data))
      .then(err => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const message = event.target.message.value;

    axios
      .post('http://localhost:8000/comments', { name, message })
      .then(() => createComment(name, message))
      .catch((err) => console.log(err));
  };

  const createComment = (name, message) => {
    const nameElm = document.createElement('h3');
    nameElm.innerText = name;

    const messageElm = document.createElement('p');
    messageElm.innerText = message;

    const wrapperElm = document.createElement('div');
    wrapperElm.appendChild(nameElm);
    wrapperElm.appendChild(messageElm);

    const commentElm = document.getElementById('comments');
    commentElm.appendChild(wrapperElm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '30px' }}>
        <input
          name="name"
          style={{ width: '400px' }}
          type="text"
          placeholder="Name"
          required
        />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <textarea
          name="message"
          style={{ width: '400px' }}
          placeholder="Your message here"
          required
        />
      </div>
      <div>
        <button type="submit" style={{ padding: '5px 10px', borderRadius: '50px' }}>
          Send
        </button>
      </div>
      <div id="comments">
        {comments.map(comment => (
          <div key={comment._id}>
            <h3>{comment.name}</h3>
            <p>{comment.message}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default App;

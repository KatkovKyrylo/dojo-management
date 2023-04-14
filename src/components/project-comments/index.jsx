import { useState } from 'react';
import { timestamp } from 'firebase/config';
import { useAuthContext } from 'hooks/useAuthContext';
import { useFirestore } from 'hooks/useFirestore';
import { Avatar } from 'components';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import styles from './styles.module.css';

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className={styles.projectComments}>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => {
            return (
              <li key={comment.commentDate}>
                <div className={styles.commentAuthor}>
                  <Avatar width={30} src={comment.photoURL} />
                  <span>{comment.displayName}</span>
                </div>
                <div className={styles.commentDate}>
                  <span>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className={styles.commentContent}>{comment.content}</div>
              </li>
            );
          })}
      </ul>

      <form className={styles.addComment} onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export { ProjectComments };

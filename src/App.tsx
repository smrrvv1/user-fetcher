import { useState, useEffect } from "react";
import { IUser, IPost } from "./types";
import UserCard from "./UserCard/UserCard"
import styles from "./App.module.css"

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  
  const getUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      if (!response.ok) throw new Error(`oшибка: ${response.status}`)
      const data: IUser[] = await response.json()
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  };

  const getUserPosts = async (userId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      if (!response.ok) throw new Error("oшибка загрузки постов")
      const data: IPost[] = await response.json()
      setPosts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  let postsContent;

  if (posts.length > 0) {
    postsContent = (
      <div>
        <h2>посты: {currentUserName}</h2>
        {posts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            {post.title}
          </div>
        ))}
      </div>
    );
  } else {
    postsContent = <p className={styles.emptyMsg}>нажмите на пользователя, чтобы увидеть посты</p>
  }

  return (
    <div className={styles.container}>
      <h1>User Directory</h1>
      <div className={styles.layout}>
        <div className={styles.column}>
          <h2>Пользователи</h2>
          {users.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onUserClick={fetchUserPosts} 
            />
          ))}
        </div>

        <div className={styles.column}>
          {postsContent}
        </div>
      </div>
    </div>
  )
}

export default App;

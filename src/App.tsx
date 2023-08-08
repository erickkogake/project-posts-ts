import { Header } from "./components/Header"
import './global.css'
import styles from './App.module.css'
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/erickkogake.png',
      name: 'Erick Kogake',
      role: 'Software Developer'
    },
    content: [
      { type: 'paragraph', content: 'Olá galerinha' },
      { type: 'paragraph', content: 'Hello World' },
      { type: 'link', content: '#erickkogakekk' }
    ],
    publishedAt: new Date('2022-05-03 20:00:00')
  }, {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/jakeliny.png',
      name: 'Jakeliny',
      role: 'Software Developer'
    },
    content: [
      { type: 'paragraph', content: 'Olá galerinha' },
      { type: 'paragraph', content: 'Hello World' },
      { type: 'link', content: '#jake' }
    ],
    publishedAt: new Date('2022-05-07 22:00:00')
  }

]

function App() {

  return (
    <>
      <Header></Header>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>

    </>
  )
}

export default App

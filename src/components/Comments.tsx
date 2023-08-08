import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comments.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
    content: string,
    onDeleteComment: (comment: string) => void
}

export function Comments({ content, onDeleteComment }: CommentProps) {
    const [likes, setLikes] = useState(0);

    const handleDeleteComment = () => {
        onDeleteComment(content)
    }

    const handleNewLikes = () => {
        if(likes === 0) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1)
        }
    }

    return (
        <div className={styles.comments}>
            <Avatar hasBorder={false} src={'https://github.com/erickkogake.png'}></Avatar>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Erick Kogake</strong>
                            <time title='' dateTime='2022-05-11 08:13:30'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24}></Trash>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleNewLikes}>
                        <ThumbsUp></ThumbsUp>
                        Aplaudir <span>{likes}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}
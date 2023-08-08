import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from './Avatar'
import { Comments } from './Comments'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

type Contents = {
    type: string,
    content: string
}

interface PostProps {
    author: Author;
    content: Contents[];
    publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
    const [comments, setComments] = useState([
        'j'
    ])
    const [newComments, setNewComments] = useState('')

    const publishedAtTitle = format(publishedAt, 'yyyy-MM-dd')
    const publishedAtNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const handleComments = (event: FormEvent) => {
        event.preventDefault();

        setComments([...comments, newComments])
        setNewComments('')
    }

    const handleNewComments = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('')
        setNewComments(event.target.value)
    }

    const deleteComment = (commentDelete: string) => {
        const commentsDeleteOne = comments.filter(comment => {
            return comment !== commentDelete
        })

        setComments(commentsDeleteOne);
    }

    const handleCommentsEmpty = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    const newCommentsEmpty = newComments.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl}></Avatar>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedAtTitle} dateTime='2022-05-11 08:13:30'>{publishedAtNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}>{line.content}</p>
                    }
                })}
            </div>

            <form onSubmit={handleComments} className={styles.commentForm}>
                <strong> Deixa seu feedback</strong>
                <textarea
                    name='comment'
                    value={newComments}
                    onChange={handleNewComments}
                    onInvalid={handleCommentsEmpty}
                    required
                    placeholder='Escreva um comentário...'>
                </textarea>
                <footer>
                    <button
                        type='submit'
                        disabled={newCommentsEmpty}
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comments => {
                    return (
                        <Comments
                            key={comments}
                            content={comments}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}
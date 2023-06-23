import Post from '../Post.js'
import './homePage.css'
import {useEffect, useState} from 'react'

export default function HomePage(){

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/posts').then(response => {
            response.json().then(posts => {
                setPosts(posts);
                console.log(posts)
            })

        })
    }, [])
    return(
        <div className='posts'>
        {posts.length > 0 && posts.map(post => (
            <Post {...post} />
        ))}
        </div>
    )
}
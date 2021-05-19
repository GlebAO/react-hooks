import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById } from '../redux/postsSlice';

export default function Post() {
    const dispatch = useDispatch()
    const data = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchPostById(5));
    }, [dispatch])

    return (
        <div style={{border: "1px solid #ccc", padding:'20px', marginBottom:'20px'}}>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

'use client';

import {useState, useEffect} from 'react';
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import {useRouter} from "next/navigation";

function ProfilePage(props) {

  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if(session?.user.id) {
      fetchPost();
    }
  }, [])

  const handleEdit = (postId) => {
    router.push(`update-prompt?id=${postId}`)
  }

  const handleDelete = async (promptId) => {
    const hasConfirmed = confirm('Are you sure wanted to delete this prompt?')
    
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${promptId.toString()}`, {
          method: 'DELETE'
        });

        const filteredPost = posts.filter(p => p._id !== promptId)

        setPosts(filteredPost);

      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Profile
      name='My'
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
import '@/modules/posts/PostsLayout/PostsLayout.scss';

import { Route, Routes } from 'react-router-dom';

import CreatePost from '@/modules/posts/features/CreatePost';

const PostsLayout = () => {
  return (
    <div className="posts-container">
      <div className="posts-layout">
        <Routes>
          <Route path="create-post/*" element={<CreatePost />} />
        </Routes>
      </div>
    </div>
  );
};

export default PostsLayout;

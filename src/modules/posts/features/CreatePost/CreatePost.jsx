import '@/modules/posts/features/CreatePost/CreatePost.scss';

import { useState } from 'react';

import view from '@/modules/posts/features/CreatePost/views/view';

const CreatePost = () => {
  const [step] = useState(1);

  const Component = view[step].component;

  return (
    <div className="create-post">
      <div className="create-post__title-steps-wrapper">
        <span className="create-post__title">{view[step].title}</span>
        <span className="create-post__steps">{`Step ${step}/2`}</span>
      </div>
      <div className="create-post__step-wrapper">
        <Component />
      </div>
    </div>
  );
};

export default CreatePost;

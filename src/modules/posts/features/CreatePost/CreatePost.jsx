import '@/modules/posts/features/CreatePost/CreatePost.scss';

import { useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Step1View from '../Step1View';
import Step2View from '../Step2View';

const CreatePost = () => {
  const navigate = useNavigate();
  const isRedirected = useRef(false);

  useEffect(() => {
    if (!isRedirected.current) {
      navigate('./form');
      isRedirected.current = true;
    }
  }, [navigate]);

  return (
    <div className="create-post">
      <Routes>
        <Route path="form" element={<Step1View onNext={() => navigate('./preview')} />} />
        <Route path="preview" element={<Step2View onPrev={() => navigate('./form')} />} />
      </Routes>
    </div>
  );
};

export default CreatePost;

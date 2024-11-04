import '@/modules/auth/components/widgets/AuthUploadFile/AuthUploadFileArea/AuthUploadFileArea.scss';

import classNames from 'classnames';
import { useState } from 'react';

import FileUploader from '@/components/shared/FileUploader';

const AuthUploadFileArea = ({ handleFile, multiple }) => {
  const [drag, setDrag] = useState(false);

  const handleDragStart = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files);
  };

  return (
    <div
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={classNames('auth-upload-file-area', { 'auth-upload-file-area--drag': drag })}
    >
      <div>
        <svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 0C1.34315 0 0 1.34315 0 3V33C0 34.6569 1.34315 36 3 36H26C27.6569 36 29 34.6569 29 33V12L17 0H3Z"
            fill="#22242B"
            fillOpacity="0.1"
          />
          <path d="M29 21L19.5 12H29V21Z" fill="#22242A" fillOpacity="0.08" />
          <path d="M17 0L17 9C17 10.6569 18.3431 12 20 12L29 12L17 0Z" fill="#32394A" fillOpacity="0.5" />
          <circle cx="27" cy="31" r="9.5" fill="#F56476" stroke="white" />
          <path
            d="M22.834 32.25V32.75C22.834 33.8546 23.7294 34.75 24.834 34.75H29.1673C30.2719 34.75 31.1673 33.8546 31.1673 32.75V32.25"
            stroke="white"
            strokeLinecap="round"
          />
          <path
            d="M27 32.4998V26.4998M27 26.4998L24.916 28.4998M27 26.4998L29.0827 28.4998"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="auth-upload-file-area__label-file-uploader-wrapper">
        <span className="auth-upload-file-area__label">Drag and drop your license file here or</span>
        <div className="auth-upload-file-area__uploader-wrapper">
          <FileUploader multiple={multiple} handleFile={handleFile}>
            <span className="auth-upload-file-area__uploader-text">browse</span>
          </FileUploader>
        </div>
      </div>
    </div>
  );
};

export default AuthUploadFileArea;

import '@/modules/auth/components/widgets/AuthUploadFile/AuthUploadedFileArea/AuthUploadedFileArea.scss';

import FileUploader from '@/components/shared/FileUploader';

const AuthUploadedFileArea = ({ children, multiple, handleFile }) => {
  return (
    <div className="auth-uploaded-file-area">
      {children}
      <div className="auth-uploaded-file-area__file-uplader-wrapper">
        <FileUploader multiple={multiple} handleFile={handleFile}>
          <span className="auth-uploaded-file-area__file-uplader-text">+ add new file</span>
        </FileUploader>
      </div>
    </div>
  );
};

export default AuthUploadedFileArea;

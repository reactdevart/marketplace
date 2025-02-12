import '@/modules/auth/components/widgets/AuthUploadFile/AuthUploadFile.scss';

const AuthUploadFile = ({ children }) => {
  return (
    <div className="auth-upload-file">
      <span className="auth-upload-file__label">License</span>
      <div className="auth-upload-file__area-wrapper">{children}</div>
      <div className="auth-upload-file__hint">
        <div className="auth-upload-file__hint-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 12C7.56 12 7.2 11.64 7.2 11.2V8C7.2 7.56 7.56 7.2 8 7.2C8.44 7.2 8.8 7.56 8.8 8V11.2C8.8 11.64 8.44 12 8 12ZM8.8 5.6H7.2V4H8.8V5.6Z"
              fill="#FFA070"
            />
          </svg>
        </div>
        <span className="auth-upload-file__hint-text">
          Once you submit your license document, your company will be officially registered and verified within the
          system.
        </span>
      </div>
    </div>
  );
};

export default AuthUploadFile;

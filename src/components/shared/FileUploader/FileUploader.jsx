import '@/components/shared/FileUploader/FileUploader.scss';

import { useRef } from 'react';

const FileUploader = ({ handleFile, multiple, children }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    handleFile(event.target.files);
  };

  return (
    <div className="file-uploader">
      <div onClick={handleClick} className="file-uploader__button-upload">
        {children}
      </div>
      <input
        multiple={multiple}
        className="file-uploader__input"
        onChange={handleChange}
        ref={hiddenFileInput}
        type="file"
      />
    </div>
  );
};

export default FileUploader;

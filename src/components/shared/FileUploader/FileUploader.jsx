import '@/components/shared/FileUploader/FileUploader.scss';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addToast } from '@/store/toaster/toasterSlice';

const FileUploader = ({ handleFile, multiple, acceptedFormats = [], children }) => {
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    if (acceptedFormats.length > 0 && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!acceptedFormats.includes(fileType)) {
        dispatch(
          addToast({
            message: `Unsupported file type: ${fileExtension}. Supported formats: ${acceptedFormats.join(', ')}`,
            type: 'error',
          })
        );
        event.target.value = '';
        return;
      }
      handleFile(event.target.files);
      return;
    }
    handleFile(event.target.files);
  };

  const acceptString = acceptedFormats.join(',');

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
        accept={acceptString}
        type="file"
      />
    </div>
  );
};

export default FileUploader;

import '@/components/widgets/CreatePostFileUploader/CreatePostFileUploader.scss';

import FileUploader from '@/components/shared/FileUploader';

const CreatePostFileUploader = (props) => {
  return (
    <div className="create-post-file-uploader">
      {(props?.maxCount !== props?.files?.length || !props?.maxCount) && (
        <FileUploader {...props}>
          <div className="create-post-file-uploader__container">
            <div className="create-post-file-uploader__box">
              <i className="create-post-file-uploader__icon icon-plus" />
            </div>
            <span className="create-post-file-uploader__text">Add photo</span>
          </div>
        </FileUploader>
      )}
      <div className="create-post-file-uploader__image-preview-container">
        {props?.files?.length > 0 &&
          props.files.map((file, index) => (
            <div key={index} className="create-post-file-uploader__image-preview">
              <img src={URL.createObjectURL(file)} alt={file.name} className="image-thumbnail" />
              <div className="create-post-file-uploader__image-delete" onClick={() => props.removeFile(index)}>
                Delete
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreatePostFileUploader;

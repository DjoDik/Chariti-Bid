import React, { ChangeEvent, useState, useEffect } from 'react';
import { Button, Input, Modal, ModalHeader } from 'reactstrap';
import { useAppDispatch } from '../Redux/hooks';
import { addAvatarThunk } from '../Redux/slice/avatarSlice';
import '../../css/Avatar.css';
import { Navigate } from 'react-router-dom';

interface PhotoUploaderProps {
  onAvatarChange: (newAvatar: string) => void;
  isEditing: boolean;
  closeModal: () => void;
}

export default function PhotoUploader({
  onAvatarChange,
  isEditing,
  closeModal,
}: PhotoUploaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropArea, setCropArea] = useState<DOMRect | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setCropArea(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(addAvatarThunk(selectedFile, onAvatarChange));
      setUploaded(true);
    }
  };

  useEffect(() => {
    if (uploaded) {
      closeModal();
    }
  }, [uploaded, closeModal]);

  if (uploaded) {
    if (isEditing) {
      return <></>;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <div>
      <Modal isOpen={true} toggle={closeModal}>
        <ModalHeader>Photo Uploader</ModalHeader>
        <div>
          <p>Upload a photo:</p>
          <Input type="file" onChange={handleFileChange} accept="image/*" />
          {selectedFile && (
            <div>
              <h3>Uploaded Photo:</h3>
              <div className="preview-container">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  className="preview-image"
                />
              </div>
            </div>
          )}
          {selectedFile && (
            <div className="image-size-info">
              <p>Image Size: {selectedFile?.size} bytes</p>
              <p>
                Image Dimensions: {selectedFile?.width} x {selectedFile?.height}
              </p>
            </div>
          )}
          <Button onClick={handleUpload}>Загрузить</Button>
        </div>
      </Modal>
    </div>
  );
}

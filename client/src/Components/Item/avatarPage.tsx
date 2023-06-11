import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Modal, ModalHeader } from 'reactstrap';
import { useAppDispatch } from '../Redux/hooks';
import { addAvatarThunk } from '../Redux/slice/avatarSlice';
import '../../Avatar.css';

export default function PhotoUploader(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cropArea, setCropArea] = useState<DOMRect | null>(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setCropArea(null); // Сбросить область обрезки
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(addAvatarThunk(selectedFile));
    }
  };

  return (
    <div>
      <Modal isOpen={true}>
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
              <p>Image Size: {selectedFile.size} bytes</p>
              <p>
                Image Dimensions: {selectedFile.width} x {selectedFile.height}
              </p>
            </div>
          )}
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </Modal>
    </div>
  );
}

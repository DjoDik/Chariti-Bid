import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Input, Modal, ModalHeader } from 'reactstrap';
import { useAppDispatch } from '../Redux/hooks';
import { addAvatarThunk } from '../Redux/slice/avatarSlice';
import '../../css/Avatar.css';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

export default function PhotoUploader({ modalOpen, toggleModal }): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { path } = useParams();
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
      toggleModal();
      dispatch(addAvatarThunk(selectedFile));
      setUploaded(true);
      // if (path === 'signup') {
      //   navigate('/');
      // }
    }
  };

  return (
    <div>
      <Modal isOpen={modalOpen}>
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
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </Modal>
    </div>
  );
}

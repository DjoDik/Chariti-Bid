import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Modal, ModalHeader } from 'reactstrap';
import { useAppDispatch } from '../Redux/hooks';
import { addAvatarThunk } from '../Redux/slice/avatarSlice';
import '../../css/Avatar.css';
import { Link, Navigate } from 'react-router-dom';

export default function PhotoUploader(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cropArea, setCropArea] = useState<DOMRect | null>(null);
  const [uploaded, setUploaded] = useState(false);
  // const { path } = useParam();

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
      setUploaded(true);
    }
  };
  // if (path === 'signup') {
  //   navigate('/');
  // }
  if (uploaded) {
    return <Navigate to="/" />;
  }

  return (
    
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Modal isOpen={true} >
        <ModalHeader>Ваш аватар</ModalHeader>
        <div>
          <Input type="file" onChange={handleFileChange} accept="image/*" />
          {selectedFile && (
            <div>
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

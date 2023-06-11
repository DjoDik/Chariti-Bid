import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { addPhotoThunk } from '../../Redux/slice/photoSlice';
import { Button, Input } from 'reactstrap';

export default function PhotoUploadForm (): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    dispatch(addPhotoThunk(selectedFiles));
    setSelectedFiles([]);
  };

  return (
    <div>
    <p style={{ margin: '25px 5px 4px' }}>Добавить фотографии</p>
      <Input name='imgArr' type="file" multiple onChange={handleFileChange} style={{ marginBottom: 10 }} accept="image/*"/>
      <Button onClick={handleUpload}>Загрузить</Button>
    </div>
  );
};

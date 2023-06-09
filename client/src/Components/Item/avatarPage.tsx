import React, { ChangeEvent, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { useAppDispatch } from '../Redux/hooks';
import { addAvatarThunk } from '../Redux/slice/avatarSlice';

export default function PhotoUploader(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(addAvatarThunk(selectedFile));
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

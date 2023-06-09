import React, { ChangeEvent, useState } from 'react';
import { Button, Input } from 'reactstrap';
// import { useAppDispatch } from '../Components/Redux/hooks';
// import { uploadAvatar } from '../Components/Redux/slice/userSlice';

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
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      dispatch(uploadAvatar(formData));
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

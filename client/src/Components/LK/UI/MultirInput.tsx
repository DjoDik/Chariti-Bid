import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { addPhotoThunk } from '../../Redux/slice/photoSlice';
import { Button, Input } from 'reactstrap';

export default function PhotoUploadForm({ itemId }: { itemId: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      dispatch(addPhotoThunk(itemId.toString(), selectedFiles)); // Передача itemId в addPhotoThunk
      setSelectedFiles([]);
    }
  };

  return (
    <div>
      <p style={{ margin: '25px 5px 4px' }}>Добавить фотографии</p>
      <Input
        name="uploads"
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
        accept="image/*"
      />
      {selectedFiles.length > 0 && (
        <div>
          <h3>Выбранные фотографии:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={handleUpload}>Загрузить</Button>
    </div>
  );
}

import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { addPhotoThunk, getDeletePhotoThunk } from '../../Redux/slice/photoSlice';
import { Button, Input } from 'reactstrap';

export default function PhotoUploadForm({ itemId }: { itemId: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemove = (index: number) => {
    const removedFile = selectedFiles[index];
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Delete photo from server if it was already uploaded
    if (removedFile && removedFile.id) {
      dispatch(getDeletePhotoThunk(removedFile.id));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('photos', file);
      });
      dispatch(addPhotoThunk(itemId.toString(), selectedFiles));
      setSelectedFiles([]);
      // window.location.reload(); // Refresh the page after successful upload
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {selectedFiles.map((file, index) => (
            <div key={index} style={{ position: 'relative', marginRight: 10, marginBottom: 10 }}>
              <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: 100 }} />
              <Button
                onClick={() => handleRemove(index)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: 0,
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button onClick={handleUpload}>Загрузить</Button>
    </div>
  );
}

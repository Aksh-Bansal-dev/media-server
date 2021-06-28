import React, { useState } from 'react';
import { server } from '../store/server';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('uploading..');
    if (!file) {
      setError('No file selected');
      return;
    }
    const body = new FormData();
    body.append('foo', file!);
    const res = await fetch(server + '/upload', {
      method: 'POST',
      body: body,
    });
    const data = await res.json();
    console.log(data);
    setFile(null);
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: 'flex',
        height: '10vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input
        name="foo"
        onChange={(e) => handleUpload(e)}
        id="file-input"
        type="file"
      />
      <span>{error}</span>
      <button type="submit">Upload</button>
    </form>
  );
};
export default FileUpload;

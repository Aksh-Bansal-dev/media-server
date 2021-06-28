import React, { useState } from "react";
import { getFilesArr } from "../store/filesArray";
import { server } from "../store/server";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("uploading..");
    if (!file) {
      setError("No file selected");
      return;
    }
    const body = new FormData();
    body.append("foo", file!);
    const res = await fetch(server + "/upload", {
      method: "POST",
      body: body,
    });
    const data = await res.json();
    console.log(data);
    setFile(null);
    setError("");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (!e.target.name) {
      return;
    }
    // @ts-ignore
    setFile(e.target.files[0]);
    const filenames = getFilesArr();
    // @ts-ignore
    if (filenames[0].includes(e.target.files[0].name)) {
      console.log();
      setError("File already exist. Upload to replace the existing file");
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: "flex",
        height: "10vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        name="foo"
        onChange={(e) => handleUpload(e)}
        id="file-input"
        type="file"
      />
      <span style={{ color: "maroon" }}>{error}</span>
      <button type="submit">Upload</button>
    </form>
  );
};
export default FileUpload;

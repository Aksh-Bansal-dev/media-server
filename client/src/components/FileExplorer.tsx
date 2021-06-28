import React, { useEffect, useState } from "react";
import { server } from "../store/server";

const FileExplorer: React.FC = () => {
  const [fileNames, setFileNames] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(server + "/files");
      const data = await res.json();
      if (data && data.done) {
        console.log(data.data);
        setFileNames(data.data);
      }
    };
    console.log("helo");
    fetcher();
  }, []);

  const handleDownload = async (filename: string) => {
    console.log("donwloading");
    window.location.href = server + "/download/" + filename;
    // const res = await fetch(server + "/download/" + filename);
  };
  return (
    <div>
      <ul className="file-list">
        {fileNames.map((e, key) => (
          <li key={key} onClick={() => handleDownload(e)}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;

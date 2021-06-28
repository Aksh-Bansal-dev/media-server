import React, { useEffect, useState } from "react";
import { fetcher } from "../utils/fetchFiles";
import { server } from "../store/server";

const FileExplorer: React.FC = () => {
  const [fileNames, setFileNames] = useState([]);
  useEffect(() => {
    fetcher(setFileNames);
  }, []);

  const handleDownload = async (filename: string) => {
    console.log("donwloading");
    window.location.href = server + "/download/" + filename;
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

import { setFilesArr } from "../store/filesArray";
import { server } from "../store/server";

export const fetcher = async (
  setFileNames?: React.Dispatch<React.SetStateAction<never[]>>,
) => {
  const res = await fetch(server + "/files");
  const data = await res.json();
  if (data && data.done) {
    if (setFileNames) {
      setFileNames(data.data);
    }
  }
  setFilesArr(data.data);
};

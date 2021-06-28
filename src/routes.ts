import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const location = path.join(process.cwd(), "temp");
    console.log(req.files);
    fs.writeFile(
      // @ts-ignore
      path.join(location, req.files.foo.name),
      // @ts-ignore
      req.files!.foo.data,
      (err) => {
        if (err) {
          console.log(err);
          return res.json({ done: false, err: "Not able to upload file" });
        }
        return console.log("input file created!");
      }
    );

    return res.json({ done: true });
  } catch (err) {
    console.log(err);
    return res.json({ done: false, err: "Something went wrong" });
  }
});

router.get("/files", (_req: Request, res: Response) => {
  try {
    const directoryPath = path.join(process.cwd(), "temp");
    // Passing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return res.json({ done: false, err });
      }
      //listing all files using forEach
      const arr: string[] = [];
      files.forEach(function (file) {
        // Do whatever you want to do with the file
        arr.push(file);
      });
      return res.json({ done: true, data: arr });
    });
  } catch (err) {
    res.json({ done: false, err });
  }
});

router.get("/download/:filename", (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;

    const location = path.join(process.cwd(), "temp", filename);
    res.download(location, () => {
      console.log("downloading" + location);
    });
  } catch (err) {
    res.json({ done: false, err });
  }
});

router.delete("/delete/:filename", (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;

    const location = path.join(process.cwd(), "temp", filename);
    fs.unlink(location, () => {
      res.json({ done: true });
    });
  } catch (err) {
    res.json({ done: false, err });
  }
});

export default router;

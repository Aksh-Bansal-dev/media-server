import React, { useState, useEffect } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import FileExplorer from "./components/FileExplorer";

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <h2 style={{ textAlign: "center", paddingTop: "2vh" }}>Media Server</h2>
      <FileUpload />
      <FileExplorer />
    </div>
  );
}

export default App;

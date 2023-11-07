import { useState, useRef, useCallback } from "react";
import "./App.css";
import Webcam from "react-webcam";

import { upload } from "./upload";

function App() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);

    await upload(imageSrc);
  }, [webcamRef]);

  return (
    <div className="App">
      <div className="container">
        {img === null ? (
          <>
            <Webcam
              width={800}
              height={600}
              ref={webcamRef}
              videoConstraints={{ width: 800, height: 600 }}
              screenshotFormat="image/jpeg"
              minScreenshotWidth={800}
              minScreenshotHeight={600}
            />
            <button onClick={() => capture()}>Capture</button>
          </>
        ) : (
          <>
            <img width="800" height="600" src={img} alt="screenshot" />
            <div style={{ color: "#ffffff", padding: "15px 0" }}>
              GPT-4V is crunching numbers...
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

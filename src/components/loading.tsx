import React, { useState, useEffect } from "react";

function LoadingText({ textStyle }: { textStyle?: string }) {
  const [loadingText, setLoadingText] = useState("Loading");
  const styleString = textStyle
    ? textStyle
    : "text-2xl font-extrabold tracking-tight  sm:text-[3rem] text-white";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        // Rotate through the loading text variations
        switch (prevText) {
          case "Loading":
            return "Loading.";
          case "Loading.":
            return "Loading..";
          case "Loading..":
            return "Loading...";
          case "Loading...":
            return "Loading";
          default:
            return "Loading";
        }
      });
    }, 500); // Change text every 500 milliseconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on unmount
    };
  }, []);

  return (
    <div>
      <h2 className={styleString}>{loadingText}</h2>
    </div>
  );
}

export default LoadingText;

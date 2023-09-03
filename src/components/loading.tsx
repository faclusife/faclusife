import React, { useState, useEffect } from "react";

function LoadingText() {
  const [loadingText, setLoadingText] = useState("Loading");

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
      {" "}
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[3rem]">
        {loadingText}
      </h2>
    </div>
  );
}

export default LoadingText;

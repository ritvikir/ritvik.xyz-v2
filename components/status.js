import React, { useEffect, useState } from "react";

export default function Status() {
  var [pstDate, setPstDate] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const options = {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleTimeString("en-US", options);
      setPstDate(formattedDate);

      const hour = date.getHours();
      setIsOnline(hour >= 8 && hour <= 24); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  pstDate = pstDate.replace(/\s/g, "").toLowerCase();

  return (
    <div className="inline-block">
      <div className="blur-[1.5px] inline-block">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            isOnline ? "bg-green-300 animate-pulse" : "bg-gray-300"
          }`}
        ></div>
      </div>
      <div className="inline-block ml-1 text-gray-400">
        <p className="text-sm font-medium">
          {isOnline ? "online" : "offline"}, {pstDate}
        </p>
      </div>
    </div>
  );
}

import { useEffect } from "react";

const Even = () => {
  //unmount 기능
  useEffect(() => {
    console.log("Even mount");
    return () => {
      console.log("Even unmount");
    };
  }, []);
  return <div>짝수</div>;
};

export default Even;

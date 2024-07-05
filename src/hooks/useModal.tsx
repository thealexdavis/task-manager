import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);
  const [message] = useState("");
  const [targetId, setTargetId] = useState(0);

  const toggle = (newTargetId: number = 0) => {
    setisOpen(!isOpen);
    if(newTargetId !== 0 && Number.isInteger(newTargetId)){
      setTargetId(newTargetId);
    } else {
      setTargetId(0);
    }
  };

  return {
    isOpen,
    toggle,
    message,
    targetId
  };
}
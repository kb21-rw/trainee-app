import { useEffect } from "react";

const useAutoCloseModal = (isSuccess: boolean, closePopup: () => void, delay: number = 3000) => {
  useEffect(() => {
    if (isSuccess) {
      const closeTimeout = setTimeout(() => {
        closePopup();
      }, delay);
      return () => clearTimeout(closeTimeout);
    }
  }, [isSuccess, closePopup, delay]);
};

export default useAutoCloseModal;

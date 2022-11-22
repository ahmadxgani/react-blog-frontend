import { useCallback, useEffect, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import PortalModal from "./PortalModal";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  children: JSX.Element | JSX.Element[];
  title: string;
}

const Modal = ({ children, show, setShow, title }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // handle what happens on click outside of modal
  const handleClickOutside = () => setShow(false);

  // handle what happens on key press
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setShow(false);
  }, []);

  useOnClickOutside(modalRef, handleClickOutside);

  useEffect(() => {
    if (show) {
      // attach the event listener if the modal is shown
      document.addEventListener("keydown", handleKeyPress);
      // remove the event listener
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [handleKeyPress, show]);

  return (
    <>
      {show && (
        <PortalModal wrapperId="modal-portal">
          <div ref={modalRef} className="absolute md:w-1/2 w-4/5 flex mx-auto top-28 inset-x-0 flex-col bg-[#E6E5F3] drop-shadow-2xl rounded gap-5 lg:p-5 md:p-3 p-2">
            <header className="flex justify-between items-center">
              <h3 className="text-lg">{title}</h3>
              <span className="text-2xl hover:cursor-pointer" onClick={() => setShow(!show)}>
                &#10006;
              </span>
            </header>
            {children}
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default Modal;

import { XCircleIcon } from "@heroicons/react/24/solid";
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
          <div ref={modalRef} className="absolute mx-auto top-28 inset-x-0 card w-96 bg-base-100 shadow-xl">
            <div className="card-body gap-5">
              <header className="card-title justify-between">
                <h3 className="text-lg">{title}</h3>
                <XCircleIcon className="hover:cursor-pointer w-6" onClick={() => setShow(!show)} />
              </header>
              {children}
            </div>
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default Modal;

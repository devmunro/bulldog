import { useSelector, useDispatch } from "react-redux";

import BodyUpdate from "../BodyStats/BodyUpdate";
import { hideModal } from "../../features/modalSlice";

export default function ModalRoot() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.modalType);
  const modalProps = useSelector((state) => state.modal.modalProps);

  const handleClose = () => {
    dispatch(hideModal());
  };

  // return null if no modalType is provided
  if (!modalType) return null;

  let modalContent;
  switch (modalType) {
    case "bodyUpdate":
      modalContent = <BodyUpdate onClose={handleClose} {...modalProps} />;
      break;
      case "login":
      modalContent = "";
      break;

    default:
      return null;
  }
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      {modalContent}
    </div>
  );
}

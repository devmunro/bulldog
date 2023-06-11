import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from './modalSlice';
import BodyUpdate from '../BodyStats/BodyUpdate';


export default function ModalRoot() {
  const dispatch = useDispatch();
  const modalType = useSelector(state => state.modal.modalType);
  const modalProps = useSelector(state => state.modal.modalProps);

  const handleClose = () => {
    dispatch(hideModal());
  };

  switch (modalType) {
    case 'bodyUpdate':
      return <BodyUpdate onClose={handleClose} {...modalProps} />;

    default:
      return null;
  }
}
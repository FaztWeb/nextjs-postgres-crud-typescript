import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import { close } from './info-modal-slice';

const Info = () => {
  const isVisible = useAppSelector(({ infoModal }) => infoModal);
  const dispatch = useAppDispatch();
  const closeInfo = () => {
    dispatch(close());
  };
  return isVisible ? (
    <ModalTemplate
      actions={{
        dispatch: closeInfo,
      }}
      header={{
        title: 'Biserica Catolica din Elisabetin',
        subtitle: 'Aflati mai multe informatii despre biserica Catolica',
      }}
    >
      YEYY SOME INFOS{' '}
    </ModalTemplate>
  ) : null;
};

export default Info;

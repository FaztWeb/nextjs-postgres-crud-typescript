import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import Dispatch from '../../Button/Dispatch/Dispatch';
import { indexOf } from 'store/widgets/widgets-actions';
import { openModal, selectFrom } from 'store/widgets/actions/modals-actions';
import { useEffect } from 'react';

// import type { ChurchInfoSuccessResponse } from 'pages/api/church-info/[church]';
const Info = () => {
  const s = selectFrom<>('info-modal');
  const zIndex = indexOf('info-modal');
  const openModifyModal = () => {
    openModal('modify-modal', {
      name: x.name,
    });
  };

  // const { currentData } = useGetChurchInfoQuery(state.name);

  return x ? (
    <ModalTemplate
      zIndex={zIndex}
      modalToClose="info-modal"
      header={{
        title: x.name,
        subtitle: 'Aflati mai multe informatii despre biserica Catolica',
      }}
    >
      <div className={info__style.container}>
        {/* <p>{currentData?.churchInfo?.churchDescription}</p> */}
        <div className={info__style.button__wrapper}>
          <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;

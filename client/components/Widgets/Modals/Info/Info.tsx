import { useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import Dispatch from '../../Button/Dispatch/Dispatch';
import { openModal, indexOf } from 'store/widgets/widgets-reducers';
import { useEffect } from 'react';
import { useGetChurchInfoQuery } from 'lib/church-info-fetcher';
import type { ChurchInfoSuccessResponse } from 'pages/api/church-info/[church]';
const Info = () => {
  const { visible, church } = useAppSelector(({ infoModal }) => infoModal);
  const zIndex = indexOf('info-modal');
  const openModifyModal = () => {
    openModal('modify-modal', church);
  };

  const { currentData } = useGetChurchInfoQuery(church);

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  return visible ? (
    <ModalTemplate
      zIndex={zIndex}
      modalToClose="info-modal"
      header={{
        title: 'Biserica Catolica din Elisabetin',
        subtitle: 'Aflati mai multe informatii despre biserica Catolica',
      }}
    >
      <div className={info__style.container}>
        <p>{currentData?.churchInfo?.churchDescription}</p>
        <div className={info__style.button__wrapper}>
          <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;

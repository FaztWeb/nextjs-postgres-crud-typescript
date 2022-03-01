import { useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import Dispatch from '../../Button/Dispatch/Dispatch';
import { openModal, indexOf } from 'store/widgets';
import { useEffect, useState } from 'react';
import { useGetChurchInfoQuery } from 'lib/church-info-fetcher';
import { church$ } from 'lib/modal';

const Info = () => {
  const { church, visible } = useAppSelector(({ infoModal }) => infoModal);
  const openModifyModal = () => {
    openModal('modify-modal', church);
  };
  const zIndex = indexOf('info-modal');
  const [info, setInfo] = useState<string>();
  useEffect(() => {
    console.log(church);
    fetch(`/api/church-info/${church}`).then(async (v) => {
      console.log('IIIIIIIIIIIIii');
      setInfo(
        'fjakldjflkasjdfkljaskldjflasjdflkjasdlkfjslajdfljasdlfkjasdlkfj'
      );
      console.log(await v.json());
    });
  }, [visible]);

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
        <p>{info}</p>
        <div className={info__style.button__wrapper}>
          <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;

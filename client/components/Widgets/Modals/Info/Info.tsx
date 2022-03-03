import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import Dispatch from '../../Button/Dispatch/Dispatch';
import { indexOf } from 'store/widgets/widgets-actions';
import { openModal, selectFrom } from 'store/widgets/actions/modals-actions';
import { useGetChurchInfoQuery } from 'lib/church-info-fetcher';

const Info = () => {
  const { name, visible } = selectFrom<{ name: string }>('info-modal');
  const openModifyModal = () => {
    openModal('modify-modal', {
      name: name,
    });
  };

  const { currentData } = useGetChurchInfoQuery(name);

  return visible ? (
    <ModalTemplate
      modalToClose="info-modal"
      header={{
        title: name,
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

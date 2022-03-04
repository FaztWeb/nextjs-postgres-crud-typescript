import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import { openModal, selectFrom } from 'store/widgets/actions/modals-actions';
import { useGetChurchInfoQuery } from 'lib/church-info-fetcher';
import Dispatch from '../../Button/Dispatch/Dispatch';
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
        subtitle: `Aflati mai multe informatii despre ${name}`,
      }}
    >
      <div className={info__style.container}>
        <div className={info__style.description}>
          {currentData?.churchInfo?.churchDescription}
        </div>
        <div className={info__style.button__wrapper}>
          <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;

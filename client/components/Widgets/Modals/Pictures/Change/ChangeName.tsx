import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store';
import ModalTemplate from '../../Modals';

const ChangeName = () => {
  const zIndex = indexOf('picture-change-name-modal');
  const { visible, pictureToChange: filename } = useAppSelector(
    ({ pictureChangeModal }) => pictureChangeModal
  );
  return visible ? (
    <ModalTemplate
      header={{
        title: `Schimbati denumirea fisierului ${filename}`,
        subtitle:
          'Acest fisier exista deja in baza noastra de date. Verificati continutul pentru a evita duplicarile, si incercati sa schimbati denumirea fisierului',
      }}
      modalToClose={'picture-change-name-modal'}
      zIndex={zIndex}
    >
      <input type="text" placeholder={filename} />
    </ModalTemplate>
  ) : null;
};

export default ChangeName;

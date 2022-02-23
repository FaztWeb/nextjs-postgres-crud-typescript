import { useAppSelector } from 'hooks/redux-hooks';
import { useState } from 'react';
import { indexOf } from 'store';
import ModalTemplate from '../../Modals';

const ChangeName = () => {
  const zIndex = indexOf('picture-change-name-modal');
  const [newFilename, setNewFilename] = useState('');
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
      <input
        type="text"
        placeholder={filename}
        onChange={(e) => {
          setNewFilename(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          fetch(`/api/images/change/${filename}`, {
            method: 'POST',
            body: newFilename,
          });
        }}
      >
        TRIMITE
      </button>
    </ModalTemplate>
  ) : null;
};

export default ChangeName;

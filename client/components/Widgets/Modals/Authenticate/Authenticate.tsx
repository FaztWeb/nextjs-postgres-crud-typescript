import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { openModal, indexOf, closeModal } from 'store/widgets';
import ModalTemplate from '../Modals';
import authenticate__style from './authenticate.module.css';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
const PROVIDERS = ['GOOGLE', 'FACEBOOK', 'APPLE', 'INSTAGRAM'] as const;
const Authenticate = () => {
  const visible = useAppSelector(({ authenticateModal }) => authenticateModal);
  const zIndex = indexOf('authenticate-modal');

  const signInWithProvider = (provider: string) => {
    signIn('github', {
      redirect: false,
    });
  };

  return visible ? (
    <ModalTemplate
      modalToClose="authenticate-modal"
      header={{
        title: 'Alege o metoda de autentificare',
        subtitle: '',
      }}
      zIndex={zIndex}
    >
      {PROVIDERS.map((provider) => (
        <button
          key={provider}
          className={authenticate__style.option}
          onClick={() => {
            signInWithProvider(provider);
          }}
        >
          {provider}
        </button>
      ))}
    </ModalTemplate>
  ) : null;
};

export default Authenticate;

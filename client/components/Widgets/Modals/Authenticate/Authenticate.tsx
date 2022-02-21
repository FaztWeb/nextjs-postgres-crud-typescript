import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { action } from 'store';
import ModalTemplate from '../Modals';
import authenticate__style from './authenticate.module.css';
import { signIn } from 'next-auth/react';
const PROVIDERS = ['GOOGLE', 'FACEBOOK', 'APPLE', 'INSTAGRAM'] as const;
const Authenticate = () => {
  const { visible, zIndex } = useAppSelector(
    ({ authenticateModal }) => authenticateModal
  );
  const dispatch = useAppDispatch();

  const closeAuthenticate = () => {
    dispatch(
      action('authenticate-modal/close', {
        zIndex: 0,
      })
    );
  };

  const signInWithProvider = (provider: string) => {
    signIn('github', {
      redirect: false,
    });
  };

  return visible ? (
    <ModalTemplate
      closeCurrentModal={closeAuthenticate}
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

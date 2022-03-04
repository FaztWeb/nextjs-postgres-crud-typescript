import { useRouter } from 'next/router';
import Header from 'components/Blog-Creator/Header/Header';
import Forms from 'components/Blog-Creator/Forms/Forms';
import monument_creator__style from './monument-creator.module.css';

const Monument = () => {
  const router = useRouter();
  return (
    <div className={monument_creator__style.fullpage}>
      <Header />
      <Forms />
    </div>
  );
};

export default Monument;

import modalStyle from './main.module.css';
import Navbar from 'components/Navbar/Navbar';
import { useAppSelector } from 'hooks/redux-hooks';
import Searchbox from 'components/Searchbox/Searchbox';
import Modal from 'components/Widgets/Modals/Modify/Modify';
import Info from 'components/Widgets/Modals/Info/Info';
import dynamic from 'next/dynamic';
import Pictures from 'components/Widgets/Modals/Pictures/Pictures';
import Authenticate from 'components/Widgets/Modals/Authenticate/Authenticate';
const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  ssr: false,
});

const Main = () => {
  const searchVisible = useAppSelector(({ showSearch }) => showSearch);
  return (
    <div className={modalStyle.app__container}>
      <DynamicMap />
      <Modal />
      <Info />
      <Navbar />
      <Pictures />
      <Authenticate />
      {searchVisible ? (
        <div className={modalStyle.app}>
          <Searchbox />
        </div>
      ) : null}
    </div>
  );
};

export default Main;

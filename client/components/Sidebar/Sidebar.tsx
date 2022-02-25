import sidebar__styles from './sidebar.module.css';
import Profile from './Profile/Profile';
import Section from './Section/Section';
import { IoMdAdd } from 'react-icons/io';
const Sidebar = () => {
  return (
    <div className={sidebar__styles.container}>
      <Profile />
      <Section></Section>
      <Section></Section>
      <Section></Section>
      <div className={sidebar__styles.make_post__container}>
        Adaugati o postare <IoMdAdd className={sidebar__styles.icon} />
      </div>
      <div className={sidebar__styles.logout}>Deconectare</div>
    </div>
  );
};
export default Sidebar;

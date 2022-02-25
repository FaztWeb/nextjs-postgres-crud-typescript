import sidebar__styles from './sidebar.module.css';
import Profile from './Profile/Profile';
import Section from './Section/Section';
const Sidebar = () => {
  return (
    <div className={sidebar__styles.container}>
      <Profile />
      <Section></Section>
      <Section></Section>
      <Section></Section>
    </div>
  );
};
export default Sidebar;

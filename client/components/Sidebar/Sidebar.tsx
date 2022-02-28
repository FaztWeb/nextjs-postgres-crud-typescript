import sidebar__styles from './sidebar.module.css';
import Profile from './Profile/Profile';
import Section from './Section/Section';
import { IoMdAdd } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FC, useRef } from 'react';
import { useRouter } from 'next/router';
const Sidebar: FC<{
  name: string;
}> = ({ name }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openSidebar = () => {
    console.log(sidebarRef.current?.classList);
    sidebarRef.current?.classList.add(sidebar__styles.open);
  };
  const router = useRouter();
  const createBlog = () => {
    router.push(`/create-blog/${name}`);
  };
  return (
    <>
      <div className={sidebar__styles.menu} onClick={openSidebar}>
        <GiHamburgerMenu />
      </div>
      <div ref={sidebarRef} className={sidebar__styles.container}>
        <Profile />
        <div
          className={sidebar__styles.make_post__container}
          onClick={createBlog}
        >
          Adaugati o postare <IoMdAdd className={sidebar__styles.icon} />
        </div>
        <Section></Section>
        <Section></Section>
        <Section></Section>
      </div>
    </>
  );
};
export default Sidebar;

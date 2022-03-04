import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../Modals';
import blogs__styles from './blogs.module.css';
import Card from './Card/Card';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RefObject, useEffect, useRef, useState } from 'react';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { useRouter } from 'next/router';
function useOnClickOutside(
  dropdown: RefObject<HTMLElement>,
  menu: RefObject<HTMLElement>,
  handler: () => unknown
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (dropdown && menu)
          if (
            !dropdown?.current ||
            dropdown?.current.contains(event.target as HTMLElement) ||
            !menu?.current ||
            menu?.current.contains(event.target as HTMLElement)
          ) {
            return;
          }
        handler();
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [dropdown, menu, handler]
  );
}

const Blogs = () => {
  const dropdown = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setIsOpen] = useState(false);
  const openMenu = () => {
    setIsOpen(true);
  };
  useOnClickOutside(dropdown, menu, () => {
    setIsOpen(false);
  });
  const router = useRouter();

  const { name, visible } = selectFrom<{ name: string }>('blogs-modal');
  return visible ? (
    <ModalTemplate
      header={{
        subtitle: 'Arhiva culturala',
        title: name,
      }}
      modalToClose="blogs-modal"
    >
      <div className={blogs__styles.container}>
        <div className={blogs__styles.options__container}>
          <div className={blogs__styles.filter__container}>
            <div ref={menu} className={blogs__styles.filter} onClick={openMenu}>
              <GiHamburgerMenu className={blogs__styles.hamburger__icon} />
            </div>
            {open ? (
              <div
                ref={dropdown}
                className={blogs__styles.filter_options__container}
              >
                <div className={blogs__styles.filter_option}>
                  Postarile mele
                </div>
                <div className={blogs__styles.filter_option}>
                  Postari preferate
                </div>
                <div className={blogs__styles.filter_option}>
                  Visionate recent
                </div>
                <div className={blogs__styles.filter_option}>
                  Cele mai apreciate
                </div>
              </div>
            ) : null}
          </div>
          <Dispatch
            action={() => {
              console.log('ACTION');
              router.push(`/create-blog/${name}`);
            }}
            payload="Scrie o postare"
          ></Dispatch>
        </div>
        <Card golden={true}></Card>
        {/* <div className={blogs__styles.search__container}>
                <div className={blogs__styles.search}>
                  <FaSearch className={blogs__styles.search__icon} />
                </div>
                <input
                  type="text"
                  className={blogs__styles.search__bar}
                  onChange={() => {
                    //
                  }}
                />
              </div> */}
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Blogs;

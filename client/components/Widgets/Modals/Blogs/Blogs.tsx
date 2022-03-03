import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../Modals';
import blogs__styles from './blogs.module.css';
import Card from './Card/Card';
// import { FaSearch } from 'react-icons/fa';
const Blogs = () => {
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
        <div className={blogs__styles.filter}></div>
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

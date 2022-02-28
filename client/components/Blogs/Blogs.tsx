import { FC } from 'react';
import blogs__styles from './blogs.module.css';
import Header from './Header/Header';
import Card from './Card/Regular/Card';
import { FaSearch } from 'react-icons/fa';
import Visit from './Visit/Visit';
const Blogs: FC<{ name: string }> = ({ name }) => {
  return (
    <div className={blogs__styles.container}>
      <Header name={name}></Header>
      <div className={blogs__styles.card__container}>
        <div className={blogs__styles.first_row}>
          <Card golden={true}></Card>
          <div className={blogs__styles.visit}>
            <Visit></Visit>
          </div>
        </div>
        <div className={blogs__styles.second_row}>
          <div className={blogs__styles.second_row__wrapper}>
            <div className={blogs__styles.search__container}>
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
            </div>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blogs;

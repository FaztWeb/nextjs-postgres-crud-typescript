import { FC } from 'react';
import blogs__styles from './blogs.module.css';
import Header from './Header/Header';
import SortBy from './SortBy/SortBy';
import Card from './Card/Card';
const Blogs: FC<{ name: string }> = ({ name }) => {
  return (
    <div className={blogs__styles.container}>
      <Header name={name}></Header>
      <SortBy></SortBy>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  );
};
export default Blogs;

import { useRouter, withRouter } from 'next/router';
import Sidebar from 'components/Sidebar/Sidebar';
import Blogs from 'components/Blogs/Blogs';
import church_cultural_archive__style from './church.module.css';
const CulturalArchive = () => {
  const router = useRouter();
  return (
    <div className={church_cultural_archive__style.container}>
      <Sidebar></Sidebar>
      <Blogs name={router.query.church as string}></Blogs>
    </div>
  );
};

export default CulturalArchive;

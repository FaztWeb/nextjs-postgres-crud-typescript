import { useRouter } from 'next/router';

const Church = () => {
  const router = useRouter();
  return <div>{router.query.church}</div>;
};

export default Church;

import Map from '../components/Map/Map';
import prisma from 'utils/prisma';
import { InferGetServerSidePropsType } from 'next';

const Main = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(users);
  return <Map />;
};

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    }, // will be passed to the page component as props
  };
}
export default Main;

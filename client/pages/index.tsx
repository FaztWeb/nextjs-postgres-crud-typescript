import prisma from '../utils/prisma';
import { InferGetServerSidePropsType } from 'next';

const Index = ({
  oldUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div> {oldUser} </div>;
};

export async function getServerSideProps() {
  const oldUser = await prisma.user.findMany({});

  return {
    props: { oldUser },
  };
}

export default Index;

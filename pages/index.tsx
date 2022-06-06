import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import client from '../apollo-client';
import { GET_TASKS } from '../pages/api/queries';
import MainContainer from '../components/MainContainer';
import Header from '../components/Header';
import TaskCreate from '../components/TaskCreate';
import TaskList from '../components/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: GET_TASKS,
//   });

//   return {
//     props: {
//       prefechedTasks: data.tasks,
//     },
//   };
// }

// type Props = {
//   prefechedTasks: Common.Task[];
// };

// const Home: NextPage<Props> = ({ prefechedTasks }: Props) => {
const Home: NextPage<Props> = () => {
  const { data } = useQuery(GET_TASKS);

  const tasks = data?.tasks || [];

  return (
    <div className="app">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Simple Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainContainer>
        <TaskCreate />
        <TaskList tasks={tasks} />
      </MainContainer>
      <ToastContainer />
    </div>
  );
};

export default Home;

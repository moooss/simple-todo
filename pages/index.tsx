import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../lib/apollo-client';
import { GET_TASKS } from '../pages/api/queries';
import MainContainer from '../components/MainContainer';
import Header from '../components/Header';
import TaskCreate from '../components/TaskCreate';
import TaskList from '../components/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetServerContext } from 'react-beautiful-dnd';

export async function getStaticProps() {
  const client = initializeApollo();

  // Data is fetched and cached by Apollo
  await client.query({
    query: GET_TASKS,
  });

  // Avoid react-beautiful-dnd server/client mismatches
  resetServerContext();

  // Data is added to the state
  return addApolloState(client, {
    props: {},
    revalidate: 1,
  });
}

const Home: NextPage = () => {
  // SSR data will be fetched from Apollo cache
  const { data } = useQuery(GET_TASKS);

  const tasks = data?.tasks || [];

  return (
    <div className="app">
      <Head>
        <title>Simple Todo</title>
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

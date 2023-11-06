import React from 'react';
import AddClientModal from '../components/AddClientModal';
import Project from '../components/Project';
import Client from '../components/Client';

const Home = () => {
  return (
    <>
        <div className='d-flex gap-3 mb-4'>
            <AddClientModal />
        </div>
        <Project />
        <Client /> 
    </>
  )
}

export default Home;
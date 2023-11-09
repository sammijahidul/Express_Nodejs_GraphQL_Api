import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECT } from '../queries/projectQueries';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../mutations/projectMutation';

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();
  console.log("projectId:", projectId);




  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECT }],
  });
  

  const handleDelete = async () => {
    if (projectId) {
      await deleteProject();
    }
  };
  
  return (
    <div className='d-flex mt-5 ms-auto'>
        <button className='btn btn-danger' onClick={handleDelete}>
            <FaTrash className='icon'/> Delete Project
        </button>

    </div>
  )
}

export default DeleteProjectButton;
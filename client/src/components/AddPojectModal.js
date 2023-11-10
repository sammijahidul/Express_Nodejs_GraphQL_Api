import React, {useState} from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROJECT } from '../mutations/projectMutation';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

const AddClientModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState();
  const [status, setStatus] = useState('new');

//   const [createProject] = useMutation(CREATE_PROJECT, {
//     variables: { name, description, status, clientId },
//     // update cash to see project after create without refresh the page
//     update: (cache, { data: { createProject } }) => {
//         const { projects } = cache.readQuery({ query: GET_PROJECTS });
//         const updatedProject = [...projects, createProject];

//         cache.writeQuery({
//             query: GET_PROJECTS,
//             // data: { projects: projects.concat([createProject]) },
//             data: { projects: updatedProject },
//         });
//     },
//     onError: (error) => {
//         console.error("Mutation error:", error);
//       },
//   });
    const [createProject] = useMutation(CREATE_PROJECT, {
        variables: { name, description, status, clientId },
        update: (cache, { data }) => {
        const newProject = data.addProject;
        cache.modify({
            fields: {
            projects(existingProjects = []) {
                return [...existingProjects, newProject];
            }
            }
        });
        },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
  

  // Get clients for select
  const {loading, error, data} = useQuery(GET_CLIENTS);


  const onSubmit = (e) => {
    e.preventDefault();

    if(name === '' || description === '' || status === '') {
        return alert("Please fill in all fields");
    }
    createProject(name, description, clientId, status);
    // createProject({ variables: { name, description, status, clientId } });


    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
        {!loading && !error && (
            <>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#addProjectModal"
                >
                    <div className='d-flex align-items-center'>
                        <FaList className='icon' />
                        <div>Add Project</div>
                    </div>
                </button>

                <div 
                    className="modal fade" 
                    id="addProjectModal" 
                    aria-labelledby="addProjectModalLabel" 
                    aria-hidden="true"
                >
                    
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id="addProjectModalLabel">
                          Add Project
                        </h5>
                        <button 
                          type="button" 
                          className="btn-close" 
                          data-bs-dismiss="modal" 
                          aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input 
                                  type='text' 
                                  className='form-control' 
                                  id='name'
                                  value={name} 
                                  onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Description</label>
                                <textarea 
                                  className='form-control' 
                                  id='description'
                                  value={description} 
                                  onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Status</label>
                                <select 
                                  id="status" 
                                  className='form-select' 
                                  value={status} 
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option value="new">Not Started</option>
                                  <option value="progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                </select>
                            </div>

{/* to show all clients name in Client field so that can select */}
                            <div className='mb-3'>
                                <label className='form-label'>Client</label>
                                <select 
                                  id="clientId" 
                                  className='form-select'
                                  value={clientId}
                                  onChange={(e) => setClientId(e.target.value)}
                                >
                                    <option value="">Select Client</option>
                                    {data.clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                data-bs-dismiss="modal" 
                                className='btn btn-primary'
                                >
                                    Submit
                            </button>
                          </form>
                    </div>          
                    </div>
                </div>
                </div>

            </>
        )}
        
    </>
  )
}

export default AddClientModal;
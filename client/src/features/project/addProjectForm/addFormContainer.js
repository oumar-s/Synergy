import { useState } from "react";
import AddProjectFormView from "./addProjectFormView";
import { useAddProjectMutation, useAddUserToProjectMutation } from "../../api/apiSlice";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import ErrorMessage from "../../../components/ErrorMessage";

export function AddProjectFormContainer() {
    const { user } = useAuth();
    const params = useParams();
    const [showToast, setShowToast] = useState(false);
    const [projectForm, setProjectForm] = useState({
        projectTitle: '',
        projectDescription: '',
        projectRepository: '',
        teamId: ''
    });
    
    const [addPost, { isLoading: isCreating, error: createError }] = useAddProjectMutation();
    const [addUserToProject, { isLoading: isAddingUser, error: addUserError }] = useAddUserToProjectMutation();
    
    if (isCreating || isAddingUser) {
        return <ErrorMessage loading={true} error={null} />;
    }

    if (createError || addUserError) {
        return <ErrorMessage loading={false} error={createError || addUserError} />;
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log('projectForm', projectForm);
        let project = {...projectForm};
        const addedProject = await addPost({project: project, teamId: params.teamId});
        console.log('addedProject', addedProject);
        //add user to project
        await addUserToProject({projectId: addedProject.data.id, userId: user.id});
        //set each input to empty
        setProjectForm({
            projectTitle: '',
            projectDescription: '',
            projectRepository: '',
            teamId: ''
        });

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }
    // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, " : ", value);
    setProjectForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
    
    return (
        <AddProjectFormView
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            formData = {projectForm}
            showToast={showToast}
            setShowToast={setShowToast}
        />
    );
}

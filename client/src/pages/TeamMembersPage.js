import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamMembersListContainer } from '../components/TeamMembersList/teamMembersListContainer';
import { useGetTeamQuery, useGetTeamMembersQuery, useRemoveMemberFromTeamMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";
import ErrorMessage from '../components/ErrorMessage';

export default function TeamMembersPage() {

    let params = useParams();
    const auth = useAuth();

    const { data: members, error: membersError, isLoading: membersLoading } = useGetTeamMembersQuery(params.teamId);
    const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);

    const [removeMemberFromTeam] = useRemoveMemberFromTeamMutation();

    const isLoading = membersLoading || teamLoading;
    const hasError = membersError || teamError;

    if (isLoading || hasError) {
        return (
            <div>
                <Navbar page="Team" />
                <ErrorMessage loading={isLoading} error={hasError} />
                <Footer />
            </div>
        );
    }

    const isOwner = team?.ownerID === auth.user?.id;
    const isMember = members?.some(member => member.user.id === auth.user?.id);
    console.log('team members', members);
    console.log('isOwner', isOwner);
    console.log('isMember', isMember);

    let tabs = [];

    if (isOwner) {
        tabs = [
            { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
            { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
            { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
            { id: 5, name: "Requests", link: "/teams/" + params.teamId + "/requests" },
            { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
        ]
    } else if(isMember) {
        tabs = [
            { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
            { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
            { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
            { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
        ]
    } else {

        tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];
    }

    const handleDelete = (memberId) => {
        // Handle member deletion
        removeMemberFromTeam(memberId);
        console.log(`Deleting member ${memberId}`);
    };

    return (
        <div className='' >
            <Navbar page="Team" />

            <TabNav tabs={tabs} />
            <div className='min-h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Team members</h2>
                </div>
                <TeamMembersListContainer members={members} onDeleteMember={handleDelete} type="team" isOwner={auth.user?.id === team?.ownerID ? true : false} />
            </div>

            <Footer />
        </div>
    );
}
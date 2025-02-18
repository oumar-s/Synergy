import {
    User,
    Building2,
    Users,
    LogOut,
    UserCircle,
    Lock,
    KeyRound,
    AtSign,
    FolderGit2,
    Check,
    X
} from 'lucide-react';
import ErrorMessage from '../ErrorMessage';

const Toast = ({ children, onClose }) => (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
      <div className="flex items-center gap-2 w-max px-4 py-3 bg-white border border-emerald-200 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full">
          <Check className="h-4 w-4 text-emerald-600" />
        </div>
        <span className="text-sm font-medium text-gray-700">{children}</span>
        <button 
          onClick={onClose} 
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
);

const SettingsView = ({ user, projectMembers, teamMembers, leaveProject, leaveTeam, uploadProfilePic, setProfilePic, profilePic, activeTab, setActiveTab, handleChange, userForm, updateProfileInfo, handleEmailChange, emailForm, handleUpdateEmail, emailError, handlePasswordChange, passwordForm, handleUpdatePassword, passwordError, showEmailConfirm, setShowEmailConfirm, showPasswordConfirm, setShowPasswordConfirm, confirmEmailUpdate, confirmPasswordUpdate, emailSuccess, passwordSuccess, showLeaveProjectConfirm, setShowLeaveProjectConfirm, confirmLeaveProject, showLeaveTeamConfirm, setShowLeaveTeamConfirm, confirmLeaveTeam, projectLeaveSuccess, teamLeaveSuccess, profileSuccess, showProfileToast, showEmailToast, showPasswordToast, showProjectToast, showTeamToast, setShowProfileToast, setShowEmailToast, setShowPasswordToast, setShowProjectToast, setShowTeamToast, profileLoading, profileError, accountLoading, accountError, projectsLoading, projectsError, teamsLoading, teamsError }) => {
    const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
        <div className={`text-center p-6 ${className}`}>
          <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      );
    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'account', label: 'Account', icon: Lock },
        { id: 'projects', label: 'Manage Projects', icon: Building2 },
        { id: 'teams', label: 'Manage Teams', icon: Users }
    ];
    return (
        <div className="min-h-screen">
            {/* Toast Notifications */}
            {showProfileToast && (
                <Toast onClose={() => setShowProfileToast(false)}>
                    Profile updated successfully!
                </Toast>
            )}
            {showEmailToast && (
                <Toast onClose={() => setShowEmailToast(false)}>
                    Email updated successfully!
                </Toast>
            )}
            {showPasswordToast && (
                <Toast onClose={() => setShowPasswordToast(false)}>
                    Password updated successfully!
                </Toast>
            )}
            {showProjectToast && (
                <Toast onClose={() => setShowProjectToast(false)}>
                    Project left successfully!
                </Toast>
            )}
            {showTeamToast && (
                <Toast onClose={() => setShowTeamToast(false)}>
                    Team left successfully!
                </Toast>
            )}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar - grid with 2 columns on mobile, vertical column on md+ screens */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <nav className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content - full width on all screens */}
                    <div className="flex-1 rounded-lg border border-gray-200 p-4 md:p-6 bg-gray-50">
                        {activeTab === 'profile' && (
                            <>
                                <ErrorMessage loading={profileLoading} error={profileError} />
                                {!profileLoading && !profileError && (
                                    <div className="space-y-6">
                                        <form onSubmit={updateProfileInfo} className="space-y-6">
                                            <h2 className="text-xl font-medium text-gray-900">Profile Settings</h2>
                                            <div className="">
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        name="profilePic"
                                                        accept="image/*"
                                                        onChange={uploadProfilePic(setProfilePic)}
                                                        className="hidden"
                                                    />
                                                    <div className="flex items-center space-x-4 mb-6">
                                                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                                            {profilePic ?
                                                                <img
                                                                    alt='user avatar'
                                                                    src={profilePic}
                                                                    className="w-20 h-20 object-cover rounded-full text-gray-400" />
                                                                :
                                                                <UserCircle className="h-12 w-12 text-gray-400" />
                                                            }
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
                                                            Change Avatar
                                                        </button>
                                                    </div>
                                                </label>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name='firstName'
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        value={userForm.firstName || ''}
                                                        onChange={handleChange}
                                                        placeholder="John"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name='lastName'
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        value={userForm.lastName || ''}
                                                        onChange={handleChange}
                                                        placeholder="Doe"

                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Bio
                                                    </label>
                                                    <textarea
                                                        name='bio'
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        value={userForm.bio || ''}
                                                        onChange={handleChange}
                                                        rows="4"
                                                        placeholder="Tell us about yourself..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Skills
                                                    </label>
                                                    <div className="flex items-center">
                                                        {/* <Code2 className="h-5 w-5 text-gray-400 mr-2" /> */}
                                                        <input
                                                            type="text"
                                                            name='skills'
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={userForm.skills || ''}
                                                            onChange={handleChange}
                                                            placeholder="React, Node.js, SQL"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Save Changes
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'account' && (
                            <>
                                <ErrorMessage loading={accountLoading} error={accountError} />
                                {!accountLoading && !accountError && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-medium text-gray-900">Account Settings</h2>

                                        <div className="space-y-6">
                                            {/* Email Section */}
                                            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                                <h3 className="text-md font-medium text-gray-900 flex items-center">
                                                    <AtSign className="h-5 w-5 mr-2 text-gray-500" />
                                                    Change Email
                                                </h3>
                                                <form onSubmit={(e) => { e.preventDefault(); handleUpdateEmail(); }}>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="email"
                                                            name='newEmail'
                                                            value={emailForm.newEmail}
                                                            onChange={handleEmailChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="New email"
                                                        />
                                                        <input
                                                            type="email"
                                                            name='confirmEmail'
                                                            value={emailForm.confirmEmail}
                                                            onChange={handleEmailChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Confirm new email"
                                                        />
                                                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                            Update Email
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                            {/* Password Section */}
                                            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                                <h3 className="text-md font-medium text-gray-900 flex items-center">
                                                    <KeyRound className="h-5 w-5 mr-2 text-gray-500" />
                                                    Change Password
                                                </h3>
                                                <form onSubmit={(e) => { e.preventDefault(); handleUpdatePassword(); }}>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="password"
                                                            name='newPassword'
                                                            value={passwordForm.newPassword}
                                                            onChange={handlePasswordChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="New password"
                                                        />
                                                        <input
                                                            type="password"
                                                            name='confirmPassword'
                                                            value={passwordForm.confirmPassword}
                                                            onChange={handlePasswordChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Confirm new password"
                                                        />
                                                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                            Update Password
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'projects' && (
                            <>
                                <ErrorMessage loading={projectsLoading} error={projectsError} />
                                {!projectsLoading && !projectsError && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-medium text-gray-900">Manage Projects</h2>
                                        {!projectMembers.length && (
                                            <EmptyState
                                                icon={FolderGit2}
                                                title="No projects found"
                                                description="Join a project to get started."
                                            />
                                        )}
                                        <div className="space-y-4">
                                            {projectMembers.map((projectMember) => (
                                                <div key={projectMember.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                    <div className="flex items-center">
                                                        <Building2 className="h-5 w-5 text-purple-500 mr-3" />
                                                        <span className="font-medium text-gray-900">{projectMember.project.projectTitle}</span>
                                                    </div>
                                                    <button 
                                                     className="px-3 py-1 text-sm text-red-600 hover:text-red-700 flex items-center"
                                                     onClick={() => setShowLeaveProjectConfirm(projectMember.id)}
                                                     >
                                                        <LogOut className="h-4 w-4 mr-1" />
                                                        Leave
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'teams' && (
                            <>
                                <ErrorMessage loading={teamsLoading} error={teamsError} />
                                {!teamsLoading && !teamsError && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-medium text-gray-900">Manage Teams</h2>
                                        {!teamMembers.length && (
                                            <EmptyState
                                                icon={Users}
                                                title="No teams found"
                                                description="Join a team to get started."
                                            />
                                        )}
                                        <div className="space-y-4">
                                            {teamMembers.map((teamMember) => (
                                                <div key={teamMember.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                    <div className="flex items-center">
                                                        <Users className="h-5 w-5 text-blue-500 mr-3" />
                                                        <span className="font-medium text-gray-900">{teamMember.team.teamName}</span>
                                                    </div>
                                                    <button 
                                                     className="px-3 py-1 text-sm text-red-600 hover:text-red-700 flex items-center"
                                                     onClick={() => setShowLeaveTeamConfirm(teamMember.id)}
                                                    >
                                                        <LogOut className="h-4 w-4 mr-1" />
                                                        Leave
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Email Confirmation Modal */}
            {showEmailConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Email Update</h2>
                        <p className="mb-4">Are you sure you want to update your email to {emailForm.newEmail}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowEmailConfirm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmEmailUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Confirmation Modal */}
            {showPasswordConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Password Update</h2>
                        <p className="mb-4">Are you sure you want to update your password?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowPasswordConfirm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmPasswordUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Leave Project Confirmation Modal */}
            {showLeaveProjectConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Leave Project</h2>
                        <p className="mb-4">Are you sure you want to leave this project?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLeaveProjectConfirm(null)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLeaveProject}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Leave Team Confirmation Modal */}
            {showLeaveTeamConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Leave Team</h2>
                        <p className="mb-4">Are you sure you want to leave this team?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLeaveTeamConfirm(null)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLeaveTeam}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SettingsView;
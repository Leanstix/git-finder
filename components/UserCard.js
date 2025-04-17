export default function UserCard({ user }) {
    if (!user) return null;
  
    return (
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center gap-4">
          <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
            {user.bio ? (
              <p className="text-gray-600">{user.bio}</p>
            ) : (
              <p className="text-gray-400 italic">No bio available</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
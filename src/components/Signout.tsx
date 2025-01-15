import { signOut } from "next-auth/react";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    signOut({
        callbackUrl: "/",
      });
  };

  return (
    <button onClick={handleLogout} className='bg-red-500 p-2 rounded-xl width-50'>
      Logout
    </button>
  );
};

export default LogoutButton;
    
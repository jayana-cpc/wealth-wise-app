
// "use client";

// import { signInWithGoogle } from '@/lib/firebase';  // Ensure this path is correct
// import { useState } from 'react';

// export default function LoginPage() {
//   const [user, setUser] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const { user } = await signInWithGoogle();
//       setUser(user);
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//       {user && (
//         <div>
//           <h2>Welcome, {user.displayName}</h2>
//           <img src={user.photoURL} alt="User profile" />
//         </div>
//       )}
//     </div>
//   );
// }

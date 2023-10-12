interface User {
  gender: string;
  name: [Object];
  location: [Object];
  email: string;
  login: [Object];
  dob: [Object];
  registered: [Object];
  phone: string;
  cell: string;
  id: [Object];
  picture: [Object];
  nat: string;
}

interface Users {
  results: User[];
}

export default async function ServerSideFetchingPage() {
  throw new Error('user was not found. Try it again')

  const fetchUsers = await fetch("https://randomuser.me/api/3");
  const users: Users = await fetchUsers.json();

  if(!fetchUsers.ok) throw new Error('user not found');

  console.log(users.results);
  return (
    <div>
      {users.results.map((user) => (
        <>
          <p>{user.email}</p>
          <p>{user.gender}</p>
        </>
      ))}
    </div>
  );
}

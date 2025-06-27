const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">StudentMaster</h1>
      <ul className="flex gap-6 text-sm">
        <li><a href="#" className="hover:underline">Dashboard</a></li>
        <li><a href="#" className="hover:underline">Reports</a></li>
        <li><a href="#" className="hover:underline">Add Student</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

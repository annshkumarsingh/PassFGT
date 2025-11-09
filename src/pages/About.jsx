const About = () => {
  return (
    <div className="text-white p-6">
      <div className="max-w-3xl mx-auto bg-neutral-800 p-8 rounded-xl border border-emerald-700 shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-500 mb-4">About PassFGT</h1>
        <p className="mb-4 text-gray-300">
          <strong>PassFGT</strong> is a simple and secure password manager built using React and Node.js. It allows users to save, edit, delete, and search passwords securely.
        </p>
        <p className="mb-4 text-gray-400">
          The project was developed as a full-stack application using:
        </p>
        <ul className="list-disc list-inside text-gray-400 mb-4">
          <li>React + Tailwind CSS for frontend</li>
          <li>Express + MongoDB for backend</li>
          <li>UUID for unique ID management</li>
          <li>React Router for navigation</li>
          <li>React Toastify for notifications</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

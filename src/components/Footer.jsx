const Footer = () => {
  return (
    <footer className="text-center py-4 mt-10 text-gray-400 border-t border-neutral-700">
      <p className="text-sm">
        © {new Date().getFullYear()} PassFGT — Secure Password Manager
      </p>
      <p className="text-xs mt-1">
        Built using React, Express & MongoDB
      </p>
    </footer>
  );
};

export default Footer;
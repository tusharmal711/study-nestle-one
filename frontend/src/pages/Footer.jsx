import { Link } from "react-router";
function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">StudyNestle</h3>
            <p className="text-green-100 mt-1">Empowering education everywhere</p>
          </div>
          
          <div className="flex space-x-6">

            <Link to="/" className="hover:text-green-300 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-green-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-green-300 transition-colors">Contact Us</Link>


          </div>
        </div>
        
        <div className="border-t border-green-700 mt-6 pt-6 text-center">
          <p className="text-green-100">
            &copy; 2025 StudyNestle. All rights reserved. Made with ❤️ by Team StudyNestle
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export default function Body() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left Hero Text */}
        <div className="md:w-1/2 space-y-4 md:ml-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-snug">
            Explore <span className="text-green-700">100+ courses materials</span> 
            designed to boost your career, and achieve your dreams.
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Find the best study materials tailored for success.
          </p>
          <a
            href="#"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 transition"
          >
            Start Learning
          </a>
        </div>

        {/* Right Hero Image */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
            src="https://static.vecteezy.com/system/resources/previews/008/670/530/large_2x/a-young-girl-holds-a-book-and-standing-under-a-beautiful-tree-photo.JPG"
            alt="student"
          />
        </div>
      </div>
    </section>
  );
}

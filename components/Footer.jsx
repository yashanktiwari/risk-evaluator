// Footer.js
'use client'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex mb-4 space-x-4">
          {/* Social Media Icons */ }
          <a href="#" className="text-gray-300 hover:text-white">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Replace the following path with your social media icon */ }
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm1.7 18.258c-1.163.67-2.584 1.034-4.177 1.034-4.86 0-8.8-3.94-8.8-8.8s3.94-8.8 8.8-8.8 8.8 3.94 8.8 8.8c0 1.296-.288 2.535-.8 3.642h-2.74v-2.164c0-1.507-.848-2.338-1.74-2.338-.848 0-1.848.648-1.848 1.842v2.26h-2.478v2.54h2.478v7.7h2.978v-7.7h2.86L14.7 18.258z"
              />
            </svg>
          </a>
          {/* Add more social media icons as needed */ }
        </div>
        <div className="text-sm">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

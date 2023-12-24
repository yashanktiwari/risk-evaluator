import AdminHeader from '@components/AdminHeader';
import React from 'react'

const UserEmails = () => {
  // Sample data
  const emailData = [
    { email: 'admin@example.com', pinCode: '1234' },
    { email: 'user1@example.com', pinCode: '5678' },
    { email: 'user2@example.com', pinCode: '9012' },
    // Add more data as needed
  ];

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto flex-col justify-center mt-8">
        <div className="text-2xl w-3/4 mx-auto font-semibold mb-4">
          User Data
        </div>
        <div className="w-3/4 mx-auto">
          <table className="bg-white border min-w-full border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-1 border-b">S.No.</th>
                <th className="py-2 px-4 border-b border-l">Email</th>
                <th className="py-2 px-4 border-b border-l">Pin Code</th>
              </tr>
            </thead>
            <tbody>
              { emailData.map((data, index) => (
                <tr key={ index } className={ index % 2 === 0 ? 'bg-gray-100' : '' }>
                  <td className="py-2 px-4 border-b text-center">{ index + 1 }</td>
                  <td className="py-2 px-4 border-b border-l">{ data.email }</td>
                  <td className="py-2 px-4 border-b border-l">{ data.pinCode }</td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserEmails;
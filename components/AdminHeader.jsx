"use client";
import Link from "next/link";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/adminLogin");
  };

  return (
    <>
      {/* Mobile screen */}
      <div className="flex md:hidden justify-between px-4 py-3">
        <span className="cursor-pointer">
          <Link href={"/"}>Guardian Preparedness</Link>
        </span>
        <span className="border border-gray-400 p-1 rounded-md cursor-pointer">
          <DensityMediumIcon />
        </span>
      </div>

      {/* Desktop screen */}
      <div className="md:flex hidden w-full border border-b-gray-400">
        <div className="w-1/3 h-16 flex items-center">
          <Link href={""}>
            <span className="font-norwester px-4 text-lg">
              Guardian Preparedness
            </span>
          </Link>
        </div>
        <div className="w-1/3 h-16 flex items-center justify-between">
          <ul className="flex justify-around w-full">
            <Link href={"/adminPanel"}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link href={"/user-emails"}>
              <li className="cursor-pointer">User Emails</li>
            </Link>
            <li className="cursor-pointer">
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="w-1/3 h-16"></div>
      </div>
    </>
  );
};

export default AdminHeader;

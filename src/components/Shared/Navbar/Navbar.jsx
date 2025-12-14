import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import Logo from "../Logo";
import MyLink from "./MyLink";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {data} = useQuery({
    queryKey: ["NavUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${user?.email}`)
      return res.data
    }
  });

  const userData = data?.[0]

  const links = (
    <>
      <li>
        <MyLink to={"/"}>Home</MyLink>
      </li>
      <li>
        <MyLink to={"/all-issues"}>All Issues</MyLink>
      </li>
      <li>
        <MyLink to={"/about-us"}>About Us</MyLink>
      </li>
      <li>
        <MyLink to={"/contact"}>Contact</MyLink>
      </li>
    </>
  );

  return (
    <div className="fixed w-full bg-gray-100 z-10 shadow-sm">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Logo />

            {/* Nav Links */}
            <ul className="hidden md:flex justify-center items-center gap-2">
              {links}
            </ul>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && userData ? userData.image : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  {user && (
                    <div className="px-4 py-3 border-b-2 border-gray-300 bg-neutral-50 cursor-default">
                      <p className="text-xs text-neutral-500">Signed in as</p>
                      <p className="font-semibold text-secondary">
                        {userData?.name}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col cursor-pointer">
                    <NavLink
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/all-issues"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      All Issues
                    </NavLink>
                    <NavLink
                      to="/about-us"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      to="/contact"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Contact
                    </NavLink>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard/home"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-bold md:font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-extrabold md:font-bold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3  hover:bg-neutral-100 transition font-bold md:font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3  hover:bg-neutral-100 transition font-bold md:font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

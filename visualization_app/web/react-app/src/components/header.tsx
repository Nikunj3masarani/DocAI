import Icon from "./icons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  Bars3Icon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { appContext } from "../hooks/provider";
import { Link } from "gatsby";
import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ meta, link }: any) => {
  const prefixPath = process.env.GATSBY_PREFIX_PATH_VALUE;
  const { user, logout } = React.useContext(appContext);
  const userName = user ? user.user.name : "Unknown";
  const userAvatarUrl = user ? user.user.avatar_url : "";
  const userID = user ? user.user.login : "unknown";

  const isDemo = process.env.GATSBY_DEMO === "true";
  
  const links = [
    { name: "About LIDA", href: `/` },
    // { name: "Gallery", href: `/gallery` },
  ];
  if (isDemo) {
    links.push({ name: "Demo", href: "/demo" });
  }

  const DarkModeToggle = () => {
    return (
      <appContext.Consumer>
        {(context: any) => {
          return (
            <>
              <>
                <button
                  onClick={() => {
                    if (context.darkMode === "dark") {
                      context.setDarkMode("light");
                    } else {
                      context.setDarkMode("dark");
                    }
                  }}
                  type="button"
                  className="flex-shrink-0 bg-primary p-1 text-secondary rounded-full hover:text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  <span className="sr-only">Toggle dark mode </span>
                  {context.darkMode === "dark" && (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                  {context.darkMode === "light" && (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </>

              <a
                href="https://github.com/microsoft/lida"
                target="_blank"
                rel="noreferrer"
                className="inline-block"
              >
                {" "}
                <span className="sr-only"> View code on GitHub</span>
                <Icon icon="github" size={5} className="ml-1 -mt-3 sm:mt-0" />
              </a>
            </>
          );
        }}
      </appContext.Consumer>
    );
  };
  return (
    <Disclosure
      as="nav"
      className="mt-6 bg-primary text-primary mb-8 border-b border-secondary"
    >
      {({ open }) => (
        <>
          <div className="  px-0 sm:px-0 lg:px-0 ">
            <div className="flex justify-between h-16">
              <div className="flex  lg:px-0 ">
                <div className="flex flex-shrink-0 pt-2">
                  <a className="block  " href={`${prefixPath}/`}>
                    <span className="text-accent   inline-block pt-2 absolute">
                      {" "}
                      <Icon icon="app" size={8} />
                    </span>
                    <div className="pt-1 text-lg ml-14     inline-block">
                      <div className=" flex flex-col">
                        <div className="text-base">{meta.title}</div>
                        <div className="text-xs"> {meta.description}</div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-6">
                  {/* Current: "border-accent text-gray-900", Default: "border-transparent text-secondary hover:border-gray-300 hover:text-primary" */}
                  {links.map((data, index) => {
                    const isActive = data.href === link;
                    const activeClass = isActive
                      ? "bg-accent  "
                      : "bg-secondary ";
                    return (
                      <div
                        key={index + "linkrow"}
                        className={`text-primary  items-center hover:text-accent hovder:bg-secondary px-1 pt-1 block   text-sm font-medium `}
                      >
                        <Link
                          className="hover:text-accent h-full flex flex-col"
                          to={data.href}
                        >
                          <div className=" flex-1 flex-col flex">
                            <div className="flex-1"></div>
                            <div className="pb-2 px-3">{data.name}</div>
                          </div>
                          <div
                            className={`${activeClass}  w-full h-1 rounded-t-lg `}
                          ></div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {
                <div className="hidden lg:ml-4 md:flex md:items-center">
                  <DarkModeToggle />

                  {user && (
                    <>
                      <div className="ml-3">
                        <div className="text-base font-medium text-primary">
                          {userName}
                        </div>
                        <div className="text-xs font-normal text-secondary">
                          {userID}
                        </div>
                      </div>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-4 relative flex-shrink-0">
                        <div>
                          <Menu.Button className="bg-primary rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={userAvatarUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-secondary' : '', 'block px-4 py-2 text-sm text-primary')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item> */}

                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  onClick={() => {
                                    logout();
                                  }}
                                  className={classNames(
                                    active ? "bg-secondary" : "",
                                    "block px-4 py-2 text-sm text-primary"
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}
                </div>
              }
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-accent text-accent", Default: "border-transparent text-gray-600 hover:bg-primary hover:border-gray-300 hover:text-primary" */}
              {links.map((data, index) => {
                return (
                  <Disclosure.Button
                    key={index + "linkrow"}
                    as="a"
                    href={prefixPath + data.href}
                    className="bg-secondary border-accent text-accent block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    {data.name}
                  </Disclosure.Button>
                );
              })}
            </div>
            <div className="mt-3 space-y-1 pb-2">
              {" "}
              <DarkModeToggle />{" "}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-secondary">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={userAvatarUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-primary">
                      {userName}
                    </div>
                    <div className="text-sm font-medium text-secondary">
                      {userID}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-primary p-1 text-secondary rounded-full hover:text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    onClick={() => logout()}
                    className="block px-4 py-2 text-base font-medium text-secondary hover:text-primary hover:bg-secondary"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;

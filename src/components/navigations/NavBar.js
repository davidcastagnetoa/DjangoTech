import { Fragment, useState } from "react";
// UI
import { Popover, Transition } from "@headlessui/react";
import { Link, Navigate } from "react-router-dom";
import {
  BookmarkIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorArrowRaysIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  Bars3Icon,
  NewspaperIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline/index.js";
import { ChevronDownIcon } from "@heroicons/react/24/solid/index.js";
import { Button } from "../ui/button.jsx";
import { ModeToggle } from "../mode-toggle.jsx";
import AlertComponent from "../../components/AlertComponent.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { Separator } from "../ui/separator.jsx";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth.js";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  { name: "Security", description: "Your customers' data will be safe and secure.", href: "#", icon: ShieldCheckIcon },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: Squares2X2Icon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "View All Products", href: "#", icon: CheckCircleIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const company = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Customers", href: "#", icon: BuildingOfficeIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const resources = [
  { name: "Community", href: "#", icon: UserGroupIcon },
  { name: "Partners", href: "#", icon: GlobeAltIcon },
  { name: "Guides", href: "#", icon: BookmarkIcon },
  { name: "Webinars", href: "#", icon: ComputerDesktopIcon },
];
const blogPosts = [
  {
    id: 1,
    name: "Boost your conversion rate",
    href: "#",
    preview: "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80",
  },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
    preview: "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ isAuthenticated, user, logout }) {
  const [redirect, setRedirect] = useState(false);

  if (isAuthenticated) {
    console.log("user data in navBar: ", user);
  }
  const initials = `${user?.first_name[0]}${user?.last_name[0]}`;

  const logoutHandler = () => {
    logout();
    console.log("Good bye!");
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/signin" replace />;
  }

  const authLinks = (
    <div className="ml-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> {/* This is a default image */}
            <AvatarFallback className="text-primary leading-1 flex h-full w-full items-center justify-center bg-muted/40 text-[15px] border border-input font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => console.info(`${user?.get_full_name} Profile. Function still not developed`)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.info(`${user?.get_full_name} Billing. Function still not developed`)}>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.info(`${user?.get_full_name} Orders. Function still not developed`)}>
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.info(`${user?.get_full_name} Subscriptions. Function still not developed`)}>
            Subscriptions
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={logoutHandler}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  const guessLinks = (
    <>
      <Button
        variant="outline"
        className="ml-2 inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base font-medium text-foreground"
      >
        <Link to="/signin">Sign in</Link>
      </Button>

      <Button className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90">
        <Link to="/signup">Sign up</Link>
      </Button>
    </>
  );

  return (
    <>
      <Popover className="relative bg-background">
        <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
            <div>
              <Link to="/" className="flex">
                <span className="sr-only">Workflow</span>
                <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-background rounded-md p-2 inline-flex items-center justify-center text-foreground hover:bg-muted hover:text-accent-foreground">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex space-x-10">
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-foreground" : "text-muted-foreground",
                          "group bg-background rounded-md inline-flex items-center text-base font-medium transition-colors hover:text-foreground/80"
                        )}
                      >
                        <span>Solutions</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-foreground" : "text-muted-foreground",
                            "ml-2 h-5 w-5 group-hover:text-muted-foreground"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-md bg-popover border ">
                          <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                            {solutions.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-3 flex flex-col justify-between rounded-lg shadow bg-card hover:bg-muted"
                              >
                                <div className="flex md:h-full lg:flex-col">
                                  <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary text-primary-foreground sm:h-12 sm:w-12">
                                      <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                  </div>
                                  <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                    <div>
                                      <p className="text-base font-medium text">{item.name}</p>
                                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-primary lg:mt-4">
                                      Learn more <span aria-hidden="true">&rarr;</span>
                                    </p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="bg-muted">
                            <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                              {callsToAction.map((item) => (
                                <div key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-muted-foreground hover:text-foreground/80 hover:bg-muted"
                                  >
                                    <item.icon className="flex-shrink-0 h-6 w-6 text-foreground" aria-hidden="true" />
                                    <span className="ml-3">{item.name}</span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Link to="/shop" className="text-base font-medium text-muted-foreground hover:text-foreground/80">
                  Shop
                </Link>
                <a href="#" className="text-base font-medium text-muted-foreground hover:text-foreground/80">
                  Docs
                </a>
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text" : "text-muted-foreground",
                          "group bg-background rounded-md inline-flex items-center text-base font-medium hover:text-foreground/80   "
                        )}
                      >
                        <span>More</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-foreground",
                            "ml-2 h-5 w-5 group-hover:text-muted-foreground"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-md bg-popover border ">
                          <div className="absolute inset-0 flex">
                            <div className="bg-background w-1/2" />
                            <div className="bg-muted w-1/2" />
                          </div>
                          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                            <nav className="grid gap-y-10 px-4 py-8 bg-background sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                              <div>
                                <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Company</h3>
                                <ul role="list" className="mt-5 space-y-6">
                                  {company.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-muted-foreground hover:text-foreground/80 hover:bg-muted"
                                      >
                                        <item.icon className="flex-shrink-0 h-6 w-6 text-foreground" aria-hidden="true" />
                                        <span className="ml-4">{item.name}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Resources</h3>
                                <ul role="list" className="mt-5 space-y-6">
                                  {resources.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-muted-foreground hover:text-foreground/80 hover:bg-muted"
                                      >
                                        <item.icon className="flex-shrink-0 h-6 w-6 text-foreground" aria-hidden="true" />
                                        <span className="ml-4">{item.name}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </nav>
                            <div className="px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                              <div>
                                <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">From the blog</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                  {blogPosts.map((post) => (
                                    <li key={post.id} className="flow-root">
                                      <a href={post.href} className="-m-3 p-3 flex rounded-lg hover:bg-foreground/10">
                                        <div className="hidden sm:block flex-shrink-0">
                                          <img className="w-32 h-20 object-cover rounded-md" src={post.imageUrl} alt="" />
                                        </div>
                                        <div className="w-0 flex-1 sm:ml-8">
                                          <h4 className="text-base font-medium text-foreground truncate">{post.name}</h4>
                                          <p className="mt-1 text-sm text-muted-foreground">{post.preview}</p>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-6 text-sm font-medium">
                                <a href="#" className="text-primary hover:text-primary/80">
                                  {" "}
                                  View all posts <span aria-hidden="true">&rarr;</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
              <div className="flex items-center md:ml-12">
                <ModeToggle className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-s" />
                {isAuthenticated ? authLinks : guessLinks}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-muted-foreground/10" />

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow ring-1 ring-black ring-opacity-5 bg-background divide-y divide-border/40">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-background rounded-md p-2 inline-flex items-center justify-center text-foreground hover:bg-muted hover:text-accent-foreground">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 p-3 flex items-center rounded-md text-base font-medium hover:bg-muted text-muted-foreground hover:text-primary"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary text-primary-foreground sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-muted-foreground hover:text-primary">{item.name}</div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-8 text-base">
                      <a href="#" className="font-medium text-primary hover:text-primary/80">
                        {" "}
                        View all products <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/shop" className="rounded-md text-base font-medium text-muted-foreground hover:text-primary">
                    Shop
                  </Link>

                  <a href="#" className="rounded-md text-base font-medium text-muted-foreground hover:text-primary">
                    Docs
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-muted-foreground hover:text-primary">
                    Company
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-muted-foreground hover:text-primary">
                    Resources
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-muted-foreground hover:text-primary">
                    Blog
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-muted-foreground hover:text-primary">
                    Contact Sales
                  </a>
                </div>
                <div className="mt-6">
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90"
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-muted-foreground/50">
                    Existing customer?{" "}
                    <Link to="/signin" className="transition-colors hover:text-foreground/80 text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <AlertComponent />
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps, {
  logout,
})(NavBar);

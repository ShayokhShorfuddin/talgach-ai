import { File, Home, PenBoxIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const sidebarMenuItems = [
  {
    key: 'home',
    title: 'Home',
    href: '/dashboard/student',
    icon: <Home />,
  },
  {
    key: 'programs',
    title: 'Programs',
    href: '/dashboard/student/programs',
    icon: <File />,
  },
  {
    key: 'writing_assistant',
    title: 'Writing Assistant',
    href: '/dashboard/student/writing-assistant',
    icon: <PenBoxIcon />,
  },
];

export function DashboardSidebar() {
  const pathName = usePathname();

  // TODO: Make sidebar collapse to icons when a button is clicked

  return (
    <Sidebar variant="sidebar" side="left">
      <SidebarHeader>
        <SidebarHeaderDropdown />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {sidebarMenuItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                className="rounded-none hover:bg-talgach-green/5 transition-colors duration-150"
                render={
                  <Link
                    href={item.href}
                    className={`py-5 ${pathName === item.href ? 'border border-talgach-green' : ''}`}
                  >
                    {item.icon}
                    <p className="font-medium">{item.title}</p>
                  </Link>
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarHeaderDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Switch Dashboard
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
          {/* TODO: We need to display appropriate dashboard options based on the roles of the user. We need a global store to preserve roles locally rather than hitting out backend */}
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 'use client';

// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useContext } from 'react';
// import { authClient } from '@/lib/auth-client';
// // import chevron_left from '@/public/svgs/chevron-left.svg';
// // import chevron_right from '@/public/svgs/chevron-right.svg';
// // import file_black from '@/public/svgs/file-black.svg';
// // import home from '@/public/svgs/home.svg';
// // import logo_green from '@/public/svgs/logo-green.svg';
// // import pen from '@/public/svgs/pen.svg';
// import { SidebarContext } from '../layout';

// type SidebarProps = {
//   name: string;
//   href: string;
//   icon: React.ReactNode;
// };

// // Array of navigation links for easier mapping
// const navLinks: Array<{ name: string; href: string; icon: React.ReactNode }> = [
//   {
//     name: 'Home',
//     href: '/dashboard/student',
//     icon: <p>Home</p>,
//   },
//   {
//     name: 'Programs',
//     href: '/dashboard/student/programs',
//     icon: <p>Programs</p>,
//   },
//   {
//     name: 'Writing Assistant',
//     href: '/dashboard/student/writing-assistant',
//     icon: <p>Writing Assistant</p>,
//   },
// ];

// export function StudentSidebar() {
//   const pathName = usePathname();
//   const router = useRouter();
//   const { expanded, toggle } = useContext(SidebarContext);

//   // Get user's first name
//   const { data, isPending } = authClient.useSession();
//   const firstName = data?.user.name.split(' ')[0] || 'User';

//   return (
//     <aside>
//       <nav className="flex flex-col justify-between h-full px-2 py-2 border-r border-neutral-200">
//         {/* Top logo and retract button */}
//         <div>
//           <div className="flex justify-between items-center">
//             {/* <Image
//               src={logo_green}
//               alt="Icon"
//               className={expanded ? 'block w-10 rotate-90 ml-2' : 'hidden'}
//             /> */}

//             <button
//               className="p-1 hover:cursor-pointer hover:bg-neutral-200 rounded-lg transition-colors duration-200"
//               type="button"
//               onClick={toggle}
//             >
//               {/* <Image
//                 src={expanded ? chevron_left : chevron_right}
//                 alt="Toggle"
//                 className="size-5"
//               /> */}
//             </button>
//           </div>

//           {/* Navigation links */}
//           <ul className="flex-1 flex flex-col gap-y-1 mt-2">
//             {navLinks.map((data) => (
//               <li key={data.name}>
//                 <SidebarLink
//                   expanded={expanded}
//                   pathName={pathName}
//                   data={data}
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Bottom profile */}
//         <button
//           type="button"
//           onClick={() => {
//             router.push('/dashboard/student/profile');
//           }}
//         >
//           <div className="flex items-center gap-x-2 mt-auto hover:cursor-pointer">
//             <div className="size-6 bg-talgach-green rounded-full flex items-center justify-center">
//               <p className="text-sm font-medium text-white">
//                 {isPending ? firstName.charAt(0).toUpperCase() : 'G'}
//               </p>
//             </div>

//             <div
//               className={`overflow-hidden transition-all duration-500 ${expanded ? 'block' : 'hidden'}`}
//             >
//               <p className="text-neutral-800 text-sm font-semibold">
//                 {isPending ? 'Guest' : firstName}
//               </p>
//             </div>
//           </div>
//         </button>
//       </nav>
//     </aside>
//   );
// }

// function SidebarLink({
//   data,
//   pathName,
//   expanded,
// }: {
//   data: SidebarProps;
//   pathName: string;
//   expanded: boolean;
// }) {
//   const { name, href, icon } = data;

//   return (
//     <Link
//       className={`relative flex items-center p-2 gap-x-2 cursor-pointer text-nowrap rounded-lg w-full ${pathName === data.href ? 'bg-neutral-200' : ''} hover:bg-neutral-200`}
//       href={href}
//     >
//       {icon}

//       <span
//         className={`text-sm text-nowrap font-medium ${expanded ? 'block' : 'hidden'}`}
//       >
//         {name}
//       </span>
//     </Link>
//   );
// }

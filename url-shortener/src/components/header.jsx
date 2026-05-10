import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";


const Header = () => {
   
    const navigate = useNavigate();

   const user = 0;

    return (
        <>
            <nav className="py-4 flex justify-between items-center">
                <Link to="/">
                    <img src="/logo.png" className="h-16" alt="Trimrr Logo" />
                </Link>
                <div className="flex gap-4">
                    {!user ? (
                        <Button onClick={() => navigate("/auth")}>Login</Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profile_pic} />
                                    <AvatarFallback>PA</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {user?.user_metadata?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to="/dashboard" className="flex">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        My Links
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                   
                                    className="text-red-400"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
            
        </>
    );
};

export default Header;
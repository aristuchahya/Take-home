import { Link, NavLink } from "react-router-dom";
import {
  Home,
  Settings,
  FileQuestion,
  Gem,
  SquareCheckBig,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {/* <Link
            to={"/"}
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110 text-primary" />
            <span className="sr-only">Acme Inc</span>
          </Link> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `flex ms-2 h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      isActive ? "bg-accent text-accent-foreground" : ""
                    }`
                  }
                >
                  <Home className="h-5 w-5  transition-all group-hover:scale-110" />
                  <span className="sr-only">Dashboard</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/admin/table-questions"
                  className={({ isActive }) =>
                    `flex ms-2 h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <FileText className="h-5 w-5 text-slate-400 transition-all group-hover:scale-110" />
                  <span className="sr-only">Data Fuzzy Set</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Data Fuzzy Set</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/admin/fuzzy-rule"
                  className={({ isActive }) =>
                    `flex ms-2 h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      isActive ? "bg-accent text-accent-foreground" : ""
                    }`
                  }
                >
                  <FileQuestion className="h-5 w-5" />
                  <span className="sr-only">Data Fuzzy Rule</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Data Fuzzy Rule</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/admin/dimension"
                  className={({ isActive }) =>
                    `flex ms-2 h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Gem className="h-5 w-5" />
                  <span className="sr-only">Variabel Pendukung</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Variabel Pendukung</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/admin/result"
                  className={({ isActive }) =>
                    `flex ms-2 h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <SquareCheckBig className="h-5 w-5" />
                  <span className="sr-only">Data Hasil</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Data Hasil</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </>
  );
}

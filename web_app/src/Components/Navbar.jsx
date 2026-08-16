import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
        <nav className="bg-slate-800 shadow-lg flex items-center justify-center py-1">

            <div className="flex items-center gap-10">
                <NavLink 
                    to="/Lintasan A" 
                    className={({ isActive }) =>
                        `py-1 px-3 text-sm ${
                        isActive 
                            ? "font-bold text-red-500 bg-slate-300" 
                            : "font-light text-white hover:text-sky-300"
                        } rounded-xl transition duration-300`
                    }
                >
                    Lintasan A
                </NavLink>

                <NavLink 
                    to="/Lintasan B" 
                    className={({ isActive }) =>
                        `py-1 px-3 text-sm ${
                        isActive 
                            ? "font-bold text-red-500 bg-slate-300" 
                            : "font-light text-white hover:text-sky-300"
                        } rounded-xl transition duration-300`
                    }
                                >
                    Lintasan B
                </NavLink>

                {/* <NavLink 
                    to="/Kolsu" 
                    className={({ isActive }) =>
                        `py-1 px-3 text-sm ${
                        isActive 
                            ? "font-bold text-red-500 bg-slate-300" 
                            : "font-light text-white hover:text-sky-300"
                        } rounded-xl transition duration-300`
                    }
                                >
                    Kolsu
                </NavLink> */}
            </div>
        </nav>
    </>
  );
}

export default Navbar;
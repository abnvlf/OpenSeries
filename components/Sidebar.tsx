"use client";

import { documentations } from "@/constants/documentations";
import { socialLinks } from "@/constants/socialLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useState } from "react";
type Props = {};

export default function Sidebar({}: Props) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <aside
                className={`absolute inset-y-0 z-20 m-6 flex min-w-[250px]  max-w-[250px] grow flex-col gap-4 overflow-y-auto rounded-xl bg-zinc-100 px-6 pb-6 pt-4 transition-all duration-300 md:static md:translate-x-0 md:pt-6 ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%+0.6rem)]"}`}
            >
                <header className="flex items-center justify-between border-b pb-3">
                    <Link className="font-bold text-zinc-800" href="/">
                        OpenSeries
                    </Link>
                    <div className="flex items-center gap-2">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                className={`${link.icon} text-xl text-zinc-500 transition-all duration-300 hover:text-zinc-800`}
                            ></Link>
                        ))}
                    </div>
                </header>
                {documentations.map((documentation) => (
                    <Fragment key={documentation.parent}>
                        <span className="text-xs font-bold uppercase text-zinc-400">{documentation.parent}</span>
                        <div className="flex flex-col">
                            {documentation.childs.map((link) => (
                                <Link
                                    key={link.href}
                                    className={`border-l-2 py-2 pl-6 text-sm ${link.href === pathname ? "border-l-zinc-800 text-zinc-800" : "text-zinc-400"}`}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </Fragment>
                ))}
            </aside>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute bottom-5 right-5 flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-2 text-white sm:px-6 md:hidden`}
            >
                <span className="hidden sm:block">{isOpen ? "Close" : "Open"} Menu</span>
                {isOpen ? (
                    <span className="icon-[ph--x] text-xl"></span>
                ) : (
                    <span className="icon-[ic--round-menu] text-xl"></span>
                )}
            </button>
        </>
    );
}

"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconInfoCircle,
  IconMessages,
  IconHelp,
  IconBell,
  IconToolsKitchen2,
  IconHeart,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#dashboard",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Informationen",
      href: "#info",
      icon: (
        <IconInfoCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Schwarzes Brett",
      href: "#blackboard",
      icon: (
        <IconMessages className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Helpdesk",
      href: "#helpdesk",
      icon: (
        <IconHelp className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Erinnerungen",
      href: "#reminders",
      icon: (
        <IconBell className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Essen Abstimmung",
      href: "#food-votes",
      icon: (
        <IconToolsKitchen2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Wunschliste",
      href: "#wishlist",
      icon: (
        <IconHeart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Einstellungen",
      href: "#settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Abmelden",
      href: "#logout",
      icon: (
        <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", // Use full height for actual app
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Max Mustermann",
                href: "#profile",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-sm font-bold">
                    MM
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-600 dark:bg-blue-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Zivildienst Portal
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-600 dark:bg-blue-500" />
    </a>
  );
};

// Main dashboard component with German content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Willkommen im Zivildienst Portal
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Verwalte deinen Zivildienst effizient und bleibe mit deiner Gemeinschaft verbunden.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Aktive Tickets", value: "3", color: "bg-red-100 dark:bg-red-900" },
            { title: "Neue Nachrichten", value: "7", color: "bg-blue-100 dark:bg-blue-900" },
            { title: "Anstehende Termine", value: "2", color: "bg-green-100 dark:bg-green-900" },
            { title: "Offene Abstimmungen", value: "1", color: "bg-yellow-100 dark:bg-yellow-900" },
          ].map((card, idx) => (
            <div
              key={idx}
              className={cn(
                "p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-all hover:shadow-md",
                card.color
              )}
            >
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                {card.value}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Neueste Einträge - Schwarzes Brett
            </h2>
            <div className="space-y-3">
              {[
                "Neue Kaffeemaschine in der Küche verfügbar",
                "Wartungsarbeiten am Samstag - Bitte beachten",
                "Gemeinsamer Grillabend nächste Woche",
              ].map((entry, idx) => (
                <div key={idx} className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-md">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{entry}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Kommende Erinnerungen
            </h2>
            <div className="space-y-3">
              {[
                { task: "Wochenbericht einreichen", time: "Morgen, 14:00" },
                { task: "Team Meeting", time: "Freitag, 10:00" },
                { task: "Monatsabschluss", time: "30. Juli, 16:00" },
              ].map((reminder, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-700 rounded-md">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{reminder.task}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{reminder.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

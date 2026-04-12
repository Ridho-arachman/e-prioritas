// app/admin/dashboard/page.tsx
"use client";

import { motion, Variants } from "framer-motion";
import DashboardHeader from "@/components/sections/dashboard/DashboardHeader";
import StatsCards from "@/components/sections/dashboard/StatsCard";
import ActivityList from "@/components/sections/dashboard/ActivityList";
import ActivityStats from "@/components/sections/dashboard/ActivityStats";
import ChartsSection from "@/components/sections/dashboard/ChartsSection";
import DomainIsuDistribution from "@/components/sections/dashboard/DomainIsuDistribution";
import KritikalitasDistribution from "@/components/sections/dashboard/KritikalitasDistribution";
import RekomendasiStatusCards from "@/components/sections/dashboard/RekomendasiStatusCards";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function AdminDashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      <motion.div variants={itemVariants}>
        <DashboardHeader />
      </motion.div>

      {/* Section baru: status rekomendasi */}
      <motion.div variants={itemVariants} className="mt-8">
        <RekomendasiStatusCards />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <StatsCards />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
      >
        <ActivityList />
        <ActivityStats />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <ChartsSection />
      </motion.div>

      {/* Section baru: dua kolom untuk distribusi */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
      >
        <DomainIsuDistribution />
        <KritikalitasDistribution />
      </motion.div>
    </motion.div>
  );
}

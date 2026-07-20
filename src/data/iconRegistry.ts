// Icon Registry — iconKey string থেকে actual React-Icons component পাওয়ার জন্য
// Skills editor এবং Services editor এটা ব্যবহার করবে।

import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiShadcnui,
  SiReactquery, SiExpress, SiJsonwebtokens, SiPrisma, SiPostgresql,
  SiMongodb, SiNginx, SiGithubactions, SiCloudinary, SiStripe,
  SiOpenai, SiLangchain
} from "react-icons/si";

import { 
  FaReact, FaNodeJs, FaDocker, FaAws, FaShieldAlt, FaBrain,
  FaServer, FaGraduationCap, FaLaptopCode, FaProjectDiagram
} from "react-icons/fa";

import { 
  BsDatabase, BsGlobe, BsCpu, BsCodeSlash, BsCloudCheck,
  BsRobot, BsBarChart, BsLaptop, BsLightningCharge, BsCloudUpload
} from "react-icons/bs";

import { BiGitBranch } from "react-icons/bi";
import type { IconType } from "react-icons";

export const iconRegistry: Record<string, IconType> = {
  // SI icons
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiShadcnui,
  SiReactquery,
  SiExpress,
  SiJsonwebtokens,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiNginx,
  SiGithubactions,
  SiCloudinary,
  SiStripe,
  SiOpenai,
  SiLangchain,

  // FA icons
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaShieldAlt,
  FaBrain,
  FaServer,
  FaGraduationCap,
  FaLaptopCode,
  FaProjectDiagram,

  // BS icons
  BsDatabase,
  BsGlobe,
  BsCpu,
  BsCodeSlash,
  BsCloudCheck,
  BsRobot,
  BsBarChart,
  BsLaptop,
  BsLightningCharge,
  BsCloudUpload,

  // BI icons
  BiGitBranch,
};

// iconKey list grouped by category — admin UI-তে dropdown-এ দেখাবে
export const iconGroups = [
  {
    label: "Frontend",
    keys: ["FaReact", "SiNextdotjs", "SiTypescript", "SiTailwindcss", "SiFramer", "SiShadcnui", "SiReactquery"],
  },
  {
    label: "Backend",
    keys: ["FaNodeJs", "SiExpress", "SiJsonwebtokens", "SiPrisma", "FaShieldAlt", "FaServer", "BsGlobe"],
  },
  {
    label: "Database",
    keys: ["SiPostgresql", "SiMongodb", "BsDatabase"],
  },
  {
    label: "DevOps / Cloud",
    keys: ["FaDocker", "SiNginx", "SiGithubactions", "BiGitBranch", "FaAws", "SiCloudinary", "SiStripe", "BsCloudUpload", "BsCloudCheck"],
  },
  {
    label: "AI",
    keys: ["SiOpenai", "SiLangchain", "FaBrain", "BsRobot", "BsCpu"],
  },
  {
    label: "General",
    keys: ["BsCodeSlash", "BsLaptop", "BsBarChart", "BsLightningCharge", "FaGraduationCap", "FaLaptopCode", "FaProjectDiagram"],
  },
];

export function getIcon(key: string): IconType {
  return iconRegistry[key] ?? BsCodeSlash;
}

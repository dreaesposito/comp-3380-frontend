import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/react";
import { subtitle, title } from "@/components/primitives";
import { PersonCard } from "@/components/common/personCard.tsx";

import pandasLogo from "@/assets/pandas-logo.png";
import pythonLogo from "@/assets/Python-logo.png";
import supabaseIcon from "@/assets/supabase-logo-icon.svg";
import reactLogo from "@/assets/React-icon.png";
// import vercelLogo from "@/assets/logo-vercel.svg";
import postgresIcon from "@/assets/postgresql-icon.png";
// import javaLogo from "@/assets/java-logo.webp";
import heroUILogo from "@/assets/heroui.png";
import tailwindLogo from "@/assets/tailwind-logo.svg";
import tsLogo from "@/assets/ts_logo.png";

const cardStyle =
  "md:w-full w-[300px] h-fit font-medium text-default-900 transition-shadow " +
    "duration-250 shadow-sm bg-background border rounded-lg dark:bg-zinc-900 dark:border-zinc-700";

const listHeadStyle =
  "flex px-4 py-2 border-b border-gray-300 dark:border-zinc-700";

const IMG_STYLES = { height: 52, width: 52 };

function PreprocessStack() {
  return (
    <ul className={cardStyle}>
      <li className={listHeadStyle}>
        <h1 className="text-2xl opacity-90">Preprocessing</h1>
      </li>
      <li className="flex w-full px-4 py-2">
        <Image alt="python logo" src={pythonLogo} style={IMG_STYLES} />
        <h1 className="text-xl p-3 opacity-85">Python</h1>
      </li>
      <li className="flex w-full px-4 py-2">
        <Image alt="pandas logo" src={pandasLogo} style={IMG_STYLES} />
        <h1 className="text-xl p-3 opacity-85">Pandas</h1>
      </li>
    </ul>
  );
}

// function DatabaseStack() {
//   return (
//     <ul className={cardStyle}>
//       <li className={listHeadStyle}>
//         <h1 className="text-2xl opacity-90">Database</h1>
//       </li>
//       <li className="flex w-full px-4 py-2 border-b border-gray-200 dark:border-zinc-700">
//         <Image
//           alt="postgres logo"
//           height="50px"
//           src={postgresIcon}
//           style={IMG_STYLES}
//         />
//         <h1 className="text-xl p-3 opacity-85">Postgres</h1>
//       </li>
//       <li className="flex w-full px-4 py-2 ">
//         <Image
//           alt="supabase logo"
//           height="50px"
//           src={supabaseIcon}
//           style={IMG_STYLES}
//         />
//         <h1 className="text-xl p-3 opacity-85">Supabase</h1>
//       </li>
//     </ul>
//   );
// }

// function BackendStack() {
//   return (
//     <ul className={cardStyle}>
//       <li className={listHeadStyle}>
//         <h1 className="text-2xl opacity-90">Backend</h1>
//       </li>
//       <li className="flex w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-zinc-700">
//         <Image alt="" style={IMG_STYLES} />
//         <h1 className="text-xl p-3 opacity-85">TBD...</h1>
//       </li>
//       <li className="flex w-full px-4 py-2">
//         <Image alt="supabase logo" src={javaLogo} style={IMG_STYLES} />
//         <h1 className="text-xl p-3 opacity-85">Java</h1>
//       </li>
//     </ul>
//   );
// }

function DBandBackend() {
  return (
    <ul className={cardStyle}>
      <li className={listHeadStyle}>
        <h1 className="text-2xl opacity-90">DB/Back End</h1>
      </li>
      <li className="flex w-full px-4 py-2 dark:border-zinc-700">
        <Image
          alt="postgres logo"
          height="50px"
          src={postgresIcon}
          style={IMG_STYLES}
        />
        <h1 className="text-xl p-3 opacity-85">Postgres</h1>
      </li>
      <li className="flex w-full px-4 py-2 ">
        <Image
          alt="supabase logo"
          height="50px"
          src={supabaseIcon}
          style={IMG_STYLES}
        />
        <h1 className="text-xl p-3 opacity-85">Supabase</h1>
      </li>
    </ul>
  );
}

function FrontendStack() {
  return (
    <ul className={cardStyle}>
      <li className={listHeadStyle}>
        <h1 className="text-2xl opacity-90">Front End</h1>
      </li>
      <li className="flex w-full px-4 py-2 ">
        <Image alt="supabase logo" src={reactLogo} style={IMG_STYLES} />
        <h1 className="text-xl p-3 opacity-85">React</h1>
      </li>
      <li className="flex w-full px-4 py-2 ">
        <Image
            alt="typescript logo"
            src={tsLogo}
            style={IMG_STYLES}
        />
        <h1 className="text-xl p-3 opacity-85">TypeScript</h1>
      </li>
      <li className="flex w-full px-4 py-2  rounded-t-lg ">
        <Image
          alt="tailwind logo"
          height="50px"
          src={tailwindLogo}
          style={IMG_STYLES}
        />
        <h1 className="text-xl p-3 opacity-85">Tailwind CSS</h1>
      </li>
      <li className="flex w-full px-4 py-2">
        <Image
          alt="heroUI logo"
          height="50px"
          src={heroUILogo}
          style={IMG_STYLES}
        />
        <h1 className="text-xl p-3 opacity-85">HeroUI</h1>
      </li>

      {/*<li className="flex w-full px-4 py-2">*/}
      {/*  <Image*/}
      {/*    alt="vercel logo"*/}
      {/*    height="50px"*/}
      {/*    src={vercelLogo}*/}
      {/*    style={IMG_STYLES}*/}
      {/*  />*/}
      {/*  <h1 className="text-xl p-3 opacity-85">Vercel</h1>*/}
      {/*</li>*/}
    </ul>
  );
}

export default function AboutPage() {
  const people = {
    drea: {
      name: "Drea Esposito",
      desc: "Computer Science @ University of Manitoba",
      profileImage: "https://avatars.githubusercontent.com/u/108188633?v=4",
      github: "https://github.com/dreaesposito",
      linkedin: "https://www.linkedin.com/in/drea-esposito/",
    },
    luc: {
      name: "Luc Benedictson",
      desc: "Computer Science @ University of Manitoba",
      profileImage: "https://avatars.githubusercontent.com/u/108703609?v=4",
      github: "https://github.com/lucbenedictson",
      linkedin: "https://www.linkedin.com/in/luc-benedictson/",
    },
    ethan: {
      name: "Ethan Robson",
      desc: "Data Science @ University of Manitoba",
      profileImage: "https://avatars.githubusercontent.com/u/97577286?v=4",
      github: "https://github.com/ethanrobson10",
      linkedin: "https://www.linkedin.com/in/ethan-robson-0a2176323/",
    },
  };

  return (
    <DefaultLayout>
      <section>
        <h1 className={title({ size: "xs" })}>About the project</h1>
        <p className={`${subtitle()} py-4`}>
          We built this project to bring NHL stats to life in a way that goes
          beyond just basic numbers. Our database covers over eight years of
          player and game statistics, capturing key aspects of the league—like
          how players, teams, and games connect. With our strong background in
          hockey, we wanted to create a system that reflects the true depth of
          the sport and offers interesting insights.
        </p>

        <p className={`${subtitle()} pb-4`}>
          Instead of just listing stats, our project digs deeper. We track
          everything from individual player performance and referee involvement,
          to team schedules and even specific hockey plays. Whether you&#39;re a
          casual fan curious about the game or an analyst looking for some
          interesting data, we wanted to make it easy to explore the NHL like
          never before.{" "}
        </p>
      </section>

      <section>
        <h1 className={title({ size: "xs" })}>Technology Used</h1>
        {/*<div className="py-6 grid gap-2 lg:grid-cols-4 md:gap-5 sm:gap-10 md:grid-cols-2">*/}
        <div className="py-6 grid gap-20 lg:grid-cols-3 md:gap-20 sm:gap-10 md:grid-cols-2 justify-center">
          {/**/}
          <PreprocessStack />
          {/*<DatabaseStack />*/}
          {/*<BackendStack />*/}
          <DBandBackend />
          <FrontendStack />
        </div>
      </section>

      <section>
        <h1 className={title({ size: "xs" })}>Contributors</h1>
        <div className="py-6 grid gap-20 lg:grid-cols-3 md:gap-20 sm:gap-10 md:grid-cols-2 justify-center">
          <PersonCard person={people.drea} />
          <PersonCard person={people.ethan} />
          <PersonCard person={people.luc} />
        </div>
      </section>
    </DefaultLayout>
  );
}

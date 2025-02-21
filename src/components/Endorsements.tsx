import { useState } from "react";
import clsx from "clsx";

import Button from "./Button";
import EndorseCard from "./EndorseCard";

import GigaPrakosaJpg from "../img/endorsers/giga-prakosa.jpg";
import AlfanJpg from "../img/endorsers/ahmad-alfan.jpg";
import WilliamJpg from "../img/endorsers/william-notowidagdo.jpg";
import YundaBellaJpg from "../img/endorsers/yunda-bella.jpg";
import AnggiJpg from "../img/endorsers/anggi-susanto.jpg";
import AndrewJpg from "../img/endorsers/andrew-christian.jpg";

const endorsements = [
  {
    name: "William Notowidagdo",
    title: "Senior VP of Engineering",
    link: "https://www.linkedin.com/in/williamn/",
    photo: WilliamJpg.src,
    description:
      "Tri is a good software engineer who understands to get things done. When he started with Ralali, Tri show a good pace in ramping up on his role and did not take long to start adding value to his squad.",
  },
  {
    name: "Giga Prakosa",
    title: "Senior Engineering Manager",
    link: "https://www.linkedin.com/in/gigaprakosa/",
    photo: GigaPrakosaJpg.src,
    description:
      "As his Manager, I have seen the exceptional contributions he has made as a Lead Front-End Engineer. Tri is an innovative problem-solver who is always willing to go above and beyond to ensure that his tasks are completed to the highest standard. He is a strong communicator and has a talent for breaking down complex technical concepts for his team and stakeholders. I have no doubt that he will just keep getting better.",
  },
  {
    name: "Ahmad Alfan",
    title: "Senior Software Engineer",
    link: "https://www.linkedin.com/in/alfan-nevo/",
    photo: AlfanJpg.src,
    description:
      "Tri is skilled and dependable software developer. Every project we have done together has been delivered within high-quality, with all tasks solved and even with some extras. I had the pleasure to work shoulder to shoulder with Tri and it was a really good experience. He’s very solid technically and his soft skills make him a great person to work with. He will becomes a great asset wherever he is, and Tri earns my highest recommendation.",
  },
  {
    name: "Yunda Bella",
    title: "Product Manager",
    link: "https://www.linkedin.com/in/yunda-bella-paramitha-25404966/",
    photo: YundaBellaJpg.src,
    description:
      "Tri always ensure his tasks met the quality and timely delivery. Not only the dedication, his collaborative and positive manner lit up the team spirit. He brings ideas and feedback to solve issues, and open to other perspective at the same time. He really is a valuable talent!",
  },
  {
    name: "Anggi Susanto",
    title: "Lead Software Engineer",
    link: "https://www.linkedin.com/in/anggi-susanto/",
    photo: AnggiJpg.src,
    description:
      "Working with Tri is an ease, he’s very skillful and do the things with his strong passion. He won’t down with any challenges, strike them with glorious victory. I work with him on some projects and find that he’s completely done his task faster and prettier than anyone. Hope we can work together again in the future.",
  },
  {
    name: "Andrew Christian",
    title: "Tech Lead, Frontend",
    link: "https://www.linkedin.com/in/andrewchristt/",
    photo: AndrewJpg.src,
    description:
      "Come and make an impact! Slogan that I want to give for him. Such a talented frontend engineer, I learn a lot from him. He always set a good example in every works that he do. He always come up with a great idea to improve our development team!",
  },
];

const Endorsements = () => {
  const [isAllEndorserVisible, setAllEndorserVisible] = useState(false);

  return (
    <>
      <p className="mb-5 text-2xl font-semibold">🗣️ What they said about me</p>

      <div
        className={clsx(
          "-m-2 flex flex-row flex-wrap",
          !isAllEndorserVisible ? "h-[700px] overflow-hidden" : "",
        )}
      >
        {endorsements.map((item, index) => (
          <div key={`endorse-card-${index}`} className="w-full p-2 md:w-1/2">
            <EndorseCard
              name={item.name}
              description={item.description}
              photo={item.photo}
              profileLink={item.link}
              title={item.title}
            />
          </div>
        ))}
      </div>

      {!isAllEndorserVisible && (
        <>
          <div
            className={clsx(
              "absolute bottom-[0] left-[0] right-[0] z-10 h-96 w-full",
              "bg-gradient-to-b from-[rgba(31,41,55,0)] to-slate-100",
              "dark:bg-gradient-to-b dark:from-[rgba(31,41,55,0)] dark:to-[#121927]",
            )}
          />

          <div className="absolute bottom-[10px] left-[0] right-[0] z-10 flex justify-center">
            <Button
              variant="primary"
              onClick={() => setAllEndorserVisible(true)}
            >
              Load More
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Endorsements;

import Link from "next/link";
import {
  RiFacebookFill,
  RiYoutubeFill,
  RiInstagramFill,
} from 'react-icons/ri';

const socials = [
  {
    icon: <RiFacebookFill />,
    path: "#",
  },
  {
    icon: <RiYoutubeFill />,
    path: "#",
  },
  {
    icon: <RiInstagramFill />,
    path: "#",
  },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {socials.map((item, index) => {
        return( 
        <Link href={item.path} key={index} className={`${iconStyles}`}>
          {item.icon}
        </Link>
        );
      })}
    </div>
  );
};

export default Socials;
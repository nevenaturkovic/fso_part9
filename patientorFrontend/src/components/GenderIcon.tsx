import { Gender } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

type GenderIconProps = {
  gender: Gender;
};

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    case "other":
      return <QuestionMarkIcon />;
    default:
      return <QuestionMarkIcon />;
  }
};

export default GenderIcon;

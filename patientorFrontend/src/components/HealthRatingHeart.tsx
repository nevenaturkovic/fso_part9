import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { HealthCheckRating } from "../types";

const HEALTHBAR_COLORS = ["green", "yellow", "orange", "red"];

const HealthRatingHeart = ({ rating }: { rating: HealthCheckRating }) => {
  return <FavoriteIcon style={{ color: HEALTHBAR_COLORS[rating] }} />;
};

export default HealthRatingHeart;

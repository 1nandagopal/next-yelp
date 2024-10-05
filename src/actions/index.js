import {
  getCampground,
  getCampgroundsByAuthor,
  getCampgroundWithReviews,
  updateCampground,
} from "./campgrounds";
import { submitReview } from "./reviews";

export { newCampground } from "./campgrounds";
export { providerSignUp } from "./auth";

export default {
  submitReview,
  getCampground,
  getCampgroundsByAuthor,
  getCampgroundWithReviews,
  updateCampground,
};

import User from "../../models/User";

export const generateUserId = async () => {
  let userId = 1;
  const lastUser = await User.findOne().sort({ userId: -1 });
  if (lastUser) {
    userId = parseInt(lastUser.userId, 10) + 1;
  }

  return String(userId).padStart(6, "0");
};

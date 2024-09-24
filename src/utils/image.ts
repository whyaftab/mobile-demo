export const AVATAR_WIDTH = 45;
export const generateInitialImage = (name: string) =>
  `https://api.dicebear.com/5.x/initials/svg?padding=20px&backgroundColor=D9D9D9&seed=${name}&scale=60&textColor=000000`;

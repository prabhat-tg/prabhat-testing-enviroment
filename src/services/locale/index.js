import { cookies } from "next/headers";

export const getSelectedLanguage = async () => {
  const cookieStore = await cookies();
  const language = cookieStore.get("NEXT_LOCALE")?.value || "en";
  return language;
};

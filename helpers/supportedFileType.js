import { helpers } from "vuelidate/lib/validators";

export const supportedFileTypes = val => {
  if (!helpers.req(val)) return true;

  const allowedFormats = ["jpeg", "jpg", "png", "svg"];
  const ext = val.split(".").pop();
  return allowedFormats.includes(ext);
};

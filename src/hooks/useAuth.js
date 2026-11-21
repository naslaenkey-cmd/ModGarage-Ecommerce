
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

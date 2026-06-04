export type Role = "employer" | "employee";

export const auth = {
  getRole(): Role {
    if (typeof window === "undefined") return "employer";
    return (localStorage.getItem("role") as Role) || "employer";
  },

  setRole(role: Role) {
    if (typeof window !== "undefined") {
      localStorage.setItem("role", role);
    }
  },
};
export type Employee = {
  id: string;
  name: string;
  salary: number;
};

export type Payroll = {
  id: string;
  employeeId: string;
  amount: number;
  status: "pending" | "claimed";
};

const load = (key: string, fallback: any) => {
  if (typeof window === "undefined") return fallback;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

const save = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const store = {
  get treasury(): number {
    return load("treasury", 100000);
  },

  set treasury(v: number) {
    save("treasury", v);
  },

  get employees(): Employee[] {
    return load("employees", []);
  },

  set employees(v: Employee[]) {
    save("employees", v);
  },

  get payrolls(): Payroll[] {
    return load("payrolls", []);
  },

  set payrolls(v: Payroll[]) {
    save("payrolls", v);
  },
};

export const treasuryEngine = {
  paySalary(amount: number) {
    const treasury = store.treasury;

    if (treasury < amount) {
      alert("Insufficient treasury funds");
      return false;
    }

    store.treasury = treasury - amount;
    return true;
  },

  fund(amount: number) {
    store.treasury = store.treasury + amount;
  },
};
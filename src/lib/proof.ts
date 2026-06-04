import { Proof } from "./db";

export const proofEngine = {
  generate(payrollId: string, amount: number): Proof {
    const raw = `${payrollId}-${amount}-${Date.now()}`;
    const hash = btoa(raw).split("").reverse().join("").slice(0, 32);
    return {
      proofId: crypto.randomUUID(),
      hash,
      timestamp: Date.now(),
      status: "valid",
    };
  },

  verify(proof: Proof, payrollId: string): boolean {
    if (!proof) return false;
    if (proof.payrollId !== undefined && (proof as any).payrollId !== payrollId) return false;
    return proof.status === "valid";
  },
};
const claim = (id: string) => {
  const data = db.get();

  const updated = data.payrolls.map((p) => {
    if (p.id === id && p.status === "approved") {
      return { ...p, status: "claimed" };
    }
    return p;
  });

  db.set({ ...data, payrolls: updated });

  alert("Payment completed");
};
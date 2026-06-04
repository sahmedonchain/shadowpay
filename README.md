# ShadowPay

> Privacy-first payroll & treasury management prototype — designed for Miden's zero-knowledge architecture.

**Live Demo:** https://shadowpay-41nn.vercel.app/

---

## What is ShadowPay?

Most onchain payroll systems are fully public. Anyone can see who got paid, how much, and from which wallet.

ShadowPay is built around a different idea — private payroll and treasury management where salary amounts, employee identities, and treasury balances stay hidden by default.

The architecture is designed to map directly onto Miden's private note and account model.

---

## Features

- **Employee Management** — Add, manage, and remove team members
- **Payroll Engine** — Create payroll batches per employee
- **Approval Flow** — Employer approves payroll, treasury auto-deducts
- **Proof-Based Claims** — Employees claim salary only after proof verification
- **Treasury System** — Fund management with real-time balance tracking
- **Full Audit Log** — Every transaction logged with timestamp and reason
- **Mobile Responsive** — Works on all screen sizes

---

## Architecture

ShadowPay's business logic is designed to mirror Miden's core primitives:

| ShadowPay | Miden |
|---|---|
| Employee record | Private account |
| Payroll creation | Note creation |
| Approval + treasury deduction | State transition + proof generation |
| Salary claim | Note consumption |
| Treasury balance | Private asset state |

Currently the proof layer is simulated client-side. Real Miden SDK integration is the next phase.

---

## Current Status

| Layer | Status |
|---|---|
| UI / UX | ✅ Complete |
| Payroll workflow | ✅ Complete |
| Treasury accounting | ✅ Complete |
| ZK proof simulation | ✅ Complete |
| Miden wallet integration | 🔜 Next phase |
| On-chain note creation | 🔜 Next phase |
| Testnet deployment | 🔜 Next phase |
| Mainnet deployment | 🔜 Targeting late July 2026 |

---

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **State:** Event-driven local store (localStorage)
- **Proof layer:** Client-side ZK proof simulation
- **Deploy:** Vercel

---

## Roadmap

### Phase 1 — UI Prototype ✅
- Complete payroll lifecycle
- Treasury management
- Proof simulation layer
- Mobile responsive UI

### Phase 2 — Miden Testnet Integration 🔜
- Install Miden SDK (`midenup`)
- Replace local store with Miden account model
- Map payroll → private notes
- Integrate Miden Wallet for signing
- Deploy and test on Miden testnet

### Phase 3 — Mainnet 🔜
- Full private payroll on Miden mainnet
- Multi-company treasury support
- Employee self-custody of salary notes
- Private audit proofs

---

## Local Development

```bash
git clone https://github.com/sahmedonchain/shadowpay.git
cd shadowpay
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Why Miden?

Miden's private note architecture is uniquely suited for payroll:

- **Notes are private by default** — salary amounts stay hidden
- **Client-side proving** — employees can verify claims locally
- **No trusted intermediary** — approval flow is cryptographically enforced
- **Private multisig** — treasury can be controlled by multiple signers privately

No other blockchain makes all of this possible together.

---

## Contributing

This is an open prototype. Feedback and contributions welcome.

If you're from the Miden team or ecosystem — I'd love guidance on the best way to map this payroll model to Miden's actual note and account primitives.

---

## Contact

- **GitHub:** [@sahmedonchain](https://github.com/sahmedonchain)
- **Twitter:** [@sahmedonchain](https://twitter.com/sahmedonchain)

---

*Built with zero prior dev experience. Long way to go — but shipping in public.*
// Removes what a static export cannot contain: the demo API route, the middleware,
// and the internal brand-study pages. Run only in CI on a throwaway checkout.
import { rmSync } from "node:fs";

for (const path of ["src/app/api", "src/middleware.ts", "src/app/[locale]/variants"]) {
  rmSync(path, { recursive: true, force: true });
  console.log(`removed ${path}`);
}

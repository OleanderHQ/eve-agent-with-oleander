import { eveChannel } from "eve/channels/eve";
import {
  localDev,
  placeholderAuth,
  vercelOidc,
  type AuthFn,
} from "eve/channels/auth";

// Dev-only: stamp a team so the team-playbook skill resolver has something to read.
// Remove or replace before production auth (Eve tutorial Step 9).
const devTeam: AuthFn<Request> = () =>
  process.env.NODE_ENV === "production"
    ? null
    : {
        attributes: { team: "growth" },
        authenticator: "dev-team",
        principalId: "dev",
        principalType: "user",
      };

export default eveChannel({
  auth: [devTeam, vercelOidc(), localDev(), placeholderAuth()],
});

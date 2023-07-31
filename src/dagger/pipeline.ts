import Client, { connect } from "@dagger.io/dagger";
import {
  containerLint,
  doctrineLint,
  phpUnit,
  phpstan,
  twigLint,
  xliffLint,
  yamlLint,
} from "./jobs.ts";

export default function pipeline(_src = ".") {
  connect(async (client: Client) => {
    await twigLint(client);
    await yamlLint(client);
    await xliffLint(client);
    await containerLint(client);
    await doctrineLint(client);
    await phpstan(client);
    await phpUnit(client);
  });
}

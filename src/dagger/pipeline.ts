import Client, { connect, uploadContext } from "@fluentci.io/dagger";
import * as jobs from "./jobs.ts";

const {
  containerLint,
  doctrineLint,
  phpUnit,
  phpstan,
  twigLint,
  xliffLint,
  yamlLint,
  runnableJobs,
  exclude,
} = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (Deno.env.has("FLUENTCI_SESSION_ID")) {
    await uploadContext(src, exclude);
  }
  connect(async (client: Client) => {
    if (args.length > 0) {
      await runSpecificJobs(client, args as jobs.Job[]);
      return;
    }

    await twigLint(client);
    await yamlLint(client);
    await xliffLint(client);
    await containerLint(client);
    await doctrineLint(client);
    await phpstan(client);
    await phpUnit(client);
  });
}

async function runSpecificJobs(client: Client, args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(client);
  }
}

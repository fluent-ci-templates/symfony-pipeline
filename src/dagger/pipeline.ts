import { uploadContext } from "../../deps.ts";
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
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[]);
    return;
  }

  await twigLint();
  await yamlLint();
  await xliffLint();
  await containerLint();
  await doctrineLint();
  await phpstan();
  await phpUnit();
}

async function runSpecificJobs(args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job();
  }
}

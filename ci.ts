import {
  phpcs,
  phpstan,
  twigLint,
  xliffLint,
  yamlLint,
  doctrineLint,
  containerLint,
  phpUnit,
} from "https://pkg.fluentci.io/symfony_pipeline@v0.7.4/mod.ts";

await phpcs();
await phpstan();
await twigLint();
await xliffLint();
await yamlLint();
await doctrineLint();
await containerLint();
await phpUnit();

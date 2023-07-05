# Symfony Pipeline

A ready-to-use GitLab CI Pipeline and Jobs for your Symfony projects.

## 🚀 Usage

Quick start:

```ts
import { GitLab } from "https://deno.land/x/symphony_pipeline/mod.ts";

const { pipeline } = GitLab;

pipeline.write(); // Write the pipeline to the file .gitlab-ci.yml
```

Or, if you want to use the predefined jobs:

```ts
import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci/mod.ts";
import { GitLab } from "https://deno.land/x/symphony_pipeline/mod.ts";

const { phpUnit, phpcs, phpstan, securityChecker, twigLint } = GitLab;

const const pipeline = new GitlabCI()
  .image("jakzal/phpqa:php8.1")
  .stages(["SecurityChecker", "CodingStandards", "UnitTests"])
  .addJob("security-checker", securityChecker.stage("SecurityChecker"))
  .addJob("phpcs", phpcs.stage("CodingStandards"))
  .addJob("phpstan", phpstan.stage("CodingStandards"))
  .addJob("twig-lint", twigLint.stage("CodingStandards"))
  .addJob("phpunit", phpUnit.stage("UnitTests"));

pipeline.write(); // Write the pipeline to the file .gitlab-ci.yml
```

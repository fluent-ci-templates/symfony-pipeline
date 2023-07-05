# Symfony Pipeline

[![deno module](https://shield.deno.dev/x/symfony_pipeline)](https://deno.land/x/symfony_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/symfony-pipeline)](https://codecov.io/gh/fluent-ci-templates/symfony-pipeline)

A ready-to-use GitLab CI Pipeline and Jobs for your Symfony projects.

## 🚀 Usage

Quick start:

```ts
import { GitLab } from "https://deno.land/x/symfony_pipeline/mod.ts";

const { pipeline } = GitLab;

pipeline.write(); // Write the pipeline to the file .gitlab-ci.yml
```

Or, if you want to use the predefined jobs:

```ts
import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci/mod.ts";
import { GitLab } from "https://deno.land/x/symfony_pipeline/mod.ts";

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

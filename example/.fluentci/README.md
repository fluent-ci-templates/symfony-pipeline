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

It will generate the following `.gitlab-ci.yml` file:

```yaml
# Do not edit this file directly. It is generated by Fluent GitLab CI

image: jakzal/phpqa:php8.1

stages:
  - SecurityChecker
  - CodingStandards
  - UnitTests

security-checker:
  script:
    - local-php-security-checker  --path=./composer.lock
  stage: SecurityChecker

phpcs:
  script:
    - phpcs -v --standard=PSR12 --ignore=./src/Kernel.php ./src
  stage: CodingStandards

phpstan:
  script:
    - phpstan analyse ./src
  stage: CodingStandards

twig-lint:
  script:
    - twig-lint lint ./templates
  stage: CodingStandards

phpunit:
  script:
    - php bin/phpunit
  stage: UnitTests
```


## 🧪 Advanced Usage

This package also provides a ready-to-use pipeline for
[Dagger](https://dagger.io/), just run the following command on your Symfony project:

```sh
dagger run deno run -A https://deno.land/x/symfony_pipeline/ci.ts
```

Or, if you want to use the predefined jobs:

```ts
import Client, { connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/symfony_pipeline/mod.ts";

const { containerLint, doctrineLint, phpUnit, phpstan, twigLint, xliffLint yamlLint } = Dagger;

function pipeline(src = ".") {
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

pipeline();
```
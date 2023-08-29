# Symfony Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fsymfony_pipeline&query=%24.version)](https://pkg.fluentci.io/symfony_pipeline)
[![deno module](https://shield.deno.dev/x/symfony_pipeline)](https://deno.land/x/symfony_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/symfony-pipeline)](https://codecov.io/gh/fluent-ci-templates/symfony-pipeline)

A ready-to-use CI/CD Pipeline for Symfony projects.

## 🚀 Usage

Run the following command in your project:

```bash
dagger run fluentci symfony_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t symfony
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Jobs

| Job          | Description                  |
| ------------ | ---------------------------- |
| phpstan      | Run PHPStan                  |
| phpcs        | Run PHPCS                    |
| twigLint     | Lint Twig templates          |
| xliffLint    | Lint XLIFF translations      |
| yamlLint     | Lint YAML files              |
| doctrineLint | Lint Doctrine entities       |
| containerLint| Lint Parameters and Services |
| phpUnit      | Run PHPUnit                  | 

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://pkg.fluentci.io/symfony_pipeline/mod.ts";

const { 
  phpcs,
  phpstan,
  twigLint,
  xliffLint,
  yamlLint,
  doctrineLint,
  containerLint,
  phpUnit 
} = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await phpcs(client, src);
    await phpstan(client, src);
    await twigLint(client, src);
    await xliffLint(client, src);
    await yamlLint(client, src);
    await doctrineLint(client, src);
    await containerLint(client, src);
    await phpUnit(client, src);
  });
}

pipeline();
```

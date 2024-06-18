# Symfony Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/symfony_pipeline)](https://pkg.fluentci.io/symfony_pipeline)
[![deno module](https://shield.deno.dev/x/symfony_pipeline)](https://deno.land/x/symfony_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/symfony)](https://jsr.io/@fluentci/symfony)
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
fluentci run .
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/symfony-pipeline@main
```

Call a function from the module:

```sh
dagger call phpstan --src .
dagger call phpcs --src .
```

## ✨ Jobs

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

```typescript
containerLint(src: Directory | string = "."): Promise<string>
doctrineLint(src: Directory | string = "."): Promise<string>
phpUnit(src: Directory | string = "."): Promise<string>
phpcs(src: Directory | string = "."): Promise<string>
phpstan(src: Directory | string = "."): Promise<string>
twigLint(src: Directory | string = "."): Promise<string>
xliffLint(src: Directory | string = "."): Promise<string>
yamlLint(src: Directory | string = "."): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { 
  phpcs,
  phpstan,
  twigLint,
  xliffLint,
  yamlLint,
  doctrineLint,
  containerLint,
  phpUnit,
 } from "jsr:@fluentci/symfony";

await phpcs();
await phpstan();
await twigLint();
await xliffLint();
await yamlLint();
await doctrineLint();
await containerLint();
await phpUnit();
```

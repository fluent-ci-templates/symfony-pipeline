import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";
import { phpUnit, phpcs, phpstan, securityChecker, twigLint } from "./jobs.ts";

const gitlabci = new GitlabCI()
  .image("jakzal/phpqa:php8.1")
  .stages(["SecurityChecker", "CodingStandards", "UnitTests"])
  .addJob("security-checker", securityChecker.stage("SecurityChecker"))
  .addJob("phpcs", phpcs.stage("CodingStandards"))
  .addJob("phpstan", phpstan.stage("CodingStandards"))
  .addJob("twig-lint", twigLint.stage("CodingStandards"))
  .addJob("phpunit", phpUnit.stage("UnitTests"));

export default gitlabci;

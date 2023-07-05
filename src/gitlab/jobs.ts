import { Job } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";

export const securityChecker = new Job().script(
  "local-php-security-checker  --path=./composer.lock"
);

export const phpcs = new Job().script(
  "phpcs -v --standard=PSR12 --ignore=./src/Kernel.php ./src"
);

export const phpstan = new Job().script("phpstan analyse ./src");

export const twigLint = new Job().script("twig-lint lint ./templates");

export const phpUnit = new Job().script("php bin/phpunit");

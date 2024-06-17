import { type Directory, dag } from "../../sdk/client.gen.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  phpcs = "phpcs",
  phpstan = "phpstan",
  twigLint = "twig-lint",
  yamlLint = "yaml-lint",
  xliffLint = "xliff-lint",
  containerLint = "container-lint",
  doctrineLint = "doctrine-lint",
  phpUnit = "phpunit",
}

export const exclude = [
  "vendor",
  "node_modules",
  ".git",
  ".fluentci",
  ".devbox",
  "var",
];

/**
 * Run phpcs
 *
 * @function
 * @description Run phpcs
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function phpcs(src: Directory | string = "."): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.phpcs)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ])
    .withExec([
      "composer",
      "global",
      "require",
      '"squizlabs/php_codesniffer=*"',
      "--no-interaction",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction"])
    .withExec([
      "phpcs",
      "-v",
      "--standard=PSR12",
      "--ignore=./src/Kernel.php",
      "./src",
    ]);

  return ctr.stdout();
}

/**
 * Run phpstan
 *
 * @function
 * @description Run phpstan
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function phpstan(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.phpstan)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction", "--no-progress"])
    .withExec(["bash", "-c", "./vendor/bin/simple-phpunit install"])
    .withExec(["bash", "-c", "./vendor/bin/simple-phpunit --version"])
    .withExec([
      "bash",
      "-c",
      "./vendor/bin/phpstan analyse ./src --memory-limit=1G",
    ]);

  return ctr.stdout();
}

/**
 * Run twig-lint
 *
 * @function
 * @description Run twig-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function twigLint(src: Directory | string = "."): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.twigLint)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction", "--no-progress"])
    .withExec(["bash", "-c", "./bin/console lint:twig templates --env=prod"]);

  return ctr.stdout();
}

/**
 * Run yaml-lint
 *
 * @function
 * @description Run yaml-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function yamlLint(src: Directory | string = "."): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.yamlLint)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction", "--no-progress"])
    .withExec(["bash", "-c", "./bin/console lint:yaml config --parse-tags"]);

  return ctr.stdout();
}

/**
 * Run xliff-lint
 *
 * @function
 * @description Run xliff-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function xliffLint(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.xliffLint)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction", "--no-progress"])
    .withExec(["bash", "-c", "./bin/console lint:xliff translations"]);

  return ctr.stdout();
}

/**
 * Run container-lint
 *
 * @function
 * @description Run container-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function containerLint(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.containerLint)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction", "--no-progress"])
    .withExec(["bash", "-c", "./bin/console lint:container --no-debug"]);

  return ctr.stdout();
}

/**
 *  Run doctrine-lint
 *
 * @function
 * @description Run doctrine-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function doctrineLint(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.doctrineLint)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction", "--no-progress"])
    .withExec([
      "bash",
      "-c",
      "./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction",
    ]);
  return ctr.stdout();
}

/**
 * Run phpunit
 *
 * @function
 * @description Run phpunit
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function phpUnit(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);
  const baseCtr = dag
    .pipeline(Job.phpUnit)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("symfony-pkgx"))
    .withEnvVariable("COMPOSER_ALLOW_SUPERUSER", "1")
    .withEnvVariable("PATH", "$PATH:$HOME/.config/composer/vendor/bin", {
      expand: true,
    })
    .withExec([
      "pkgx",
      "install",
      "node@18.16.1",
      "classic.yarnpkg.com",
      "bun",
      "symfony",
      "composer",
      "php",
      "git",
      "zip",
      "unzip",
    ]);
  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      dag.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["composer", "install", "--no-interaction"])
    .withExec(["bash", "-c", "./vendor/bin/simple-phpunit install"])
    .withExec(["bash", "-c", "./vendor/bin/simple-phpunit --version"])
    .withExec(["bash", "-c", "./vendor/bin/simple-phpunit"]);

  return ctr.stdout();
}

export type JobExec = (src?: Directory | string) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.phpcs]: phpcs,
  [Job.phpstan]: phpstan,
  [Job.twigLint]: twigLint,
  [Job.yamlLint]: yamlLint,
  [Job.xliffLint]: xliffLint,
  [Job.containerLint]: containerLint,
  [Job.doctrineLint]: doctrineLint,
  [Job.phpUnit]: phpUnit,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.phpcs]: "Run phpcs",
  [Job.phpstan]: "Run phpstan",
  [Job.twigLint]: "Run twig-lint",
  [Job.yamlLint]: "Run yaml-lint",
  [Job.xliffLint]: "Run xliff-lint",
  [Job.containerLint]: "Run container-lint",
  [Job.doctrineLint]: "Run doctrine-lint",
  [Job.phpUnit]: "Run phpunit",
};

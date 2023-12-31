import { Client, Directory } from "../../sdk/client.gen.ts";
import { connect } from "../../sdk/connect.ts";
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
 * @function
 * @description Run phpcs
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function phpcs(src: Directory | string = "."): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.phpcs)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(["sh", "-c", "devbox run -- composer install --no-interaction"])
      .withExec([
        "sh",
        "-c",
        "devbox run -- phpcs -v --standard=PSR12 --ignore=./src/Kernel.php ./src",
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run phpstan
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function phpstan(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.phpstan)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        "devbox run -- composer install --no-interaction --no-progress",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./vendor/bin/simple-phpunit install",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./vendor/bin/simple-phpunit --version",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./vendor/bin/phpstan analyse ./src --memory-limit=1G",
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run twig-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function twigLint(src: Directory | string = "."): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.twigLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withEnvVariable("DEVBOX_DEBUG", "1")
      .withExec([
        "sh",
        "-c",
        "devbox run -- composer install --no-interaction --no-progress",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./bin/console lint:twig templates --env=prod",
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run yaml-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function yamlLint(src: Directory | string = "."): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.yamlLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        "devbox run -- composer install --no-interaction --no-progress",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./bin/console lint:yaml config --parse-tags",
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run xliff-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function xliffLint(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.xliffLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        "devbox run -- composer install --no-interaction --no-progress",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./bin/console lint:xliff translations",
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run container-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function containerLint(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.containerLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        "devbox run -- composer install --no-interaction --no-progress",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./bin/console lint:container --no-debug",
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run doctrine-lint
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function doctrineLint(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.doctrineLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        "devbox run -- composer install --no-interaction --no-progress",
      ])
      .withExec([
        "sh",
        "-c",
        "devbox run -- ./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction",
      ]);
    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Run phpunit
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function phpUnit(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const baseCtr = client
      .pipeline(Job.phpUnit)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["sh", "-c", "devbox version update"]);
    const ctr = baseCtr
      .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
      .withMountedCache(
        "/app/node_modules",
        client.cacheVolume("symfony-node_modules")
      )
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(["sh", "-c", "devbox run -- composer install --no-interaction"])
      .withExec(["sh", "-c", "devbox run -- vendor/bin/simple-phpunit install"])
      .withExec([
        "sh",
        "-c",
        "devbox run -- vendor/bin/simple-phpunit --version",
      ])
      .withExec(["sh", "-c", "devbox run -- vendor/bin/simple-phpunit"]);

    result = await ctr.stdout();
  });
  return result;
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

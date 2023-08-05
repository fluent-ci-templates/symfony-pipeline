import Client from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts";

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

export const phpcs = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.phpcs)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
    .withExec(["sh", "-c", "devbox run -- composer install --no-interaction"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- phpcs -v --standard=PSR12 --ignore=./src/Kernel.php ./src",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const phpstan = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.phpstan)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
    .withWorkdir("/app")
    .withExec([
      "sh",
      "-c",
      "devbox run -- composer install --no-interaction --no-progress",
    ])
    .withExec(["sh", "-c", "devbox run -- ./vendor/bin/simple-phpunit install"])
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

  const result = await ctr.stdout();

  console.log(result);
};

export const twigLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.twigLint)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
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

  const result = await ctr.stdout();

  console.log(result);
};

export const yamlLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.yamlLint)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
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

  const result = await ctr.stdout();

  console.log(result);
};

export const xliffLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.xliffLint)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
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

  const result = await ctr.stdout();

  console.log(result);
};

export const containerLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.containerLint)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
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

  const result = await ctr.stdout();

  console.log(result);
};

export const doctrineLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.doctrineLint)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
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

  const result = await ctr.stdout();

  console.log(result);
};

export const phpUnit = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline(Job.phpUnit)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );
  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withMountedCache(
      "/app/node_modules",
      client.cacheVolume("symfony-node_modules")
    )
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git", ".fluentci", ".devbox"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "devbox run -- composer install --no-interaction"])
    .withExec(["sh", "-c", "devbox run -- vendor/bin/simple-phpunit install"])
    .withExec(["sh", "-c", "devbox run -- vendor/bin/simple-phpunit --version"])
    .withExec(["sh", "-c", "devbox run -- vendor/bin/simple-phpunit"]);

  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (client: Client, src?: string) => Promise<void>;

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

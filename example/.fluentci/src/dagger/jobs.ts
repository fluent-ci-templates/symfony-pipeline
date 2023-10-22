import Client, { CacheSharingMode, connect } from "../../deps.ts";

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

export const phpcs = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.phpcs)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const phpstan = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.phpstan)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const twigLint = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.twigLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const yamlLint = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.yamlLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const xliffLint = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.xliffLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const containerLint = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.containerLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const doctrineLint = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.doctrineLint)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const phpUnit = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const baseCtr = client
      .pipeline(Job.phpUnit)
      .container()
      .from("ghcr.io/fluentci-io/devbox:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export type JobExec = (src?: string) => Promise<string>;

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

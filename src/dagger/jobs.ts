import Client from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts";

export const phpcs = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline("phpcs")
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
      .pipeline("phpstan")
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
      "eval $(devbox shell --print-env) && \
      ./vendor/bin/simple-phpunit install && \
      ./vendor/bin/simple-phpunit --version && \
      ./vendor/bin/phpstan analyse ./src --memory-limit=1G",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const twigLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const baseCtr = withDevbox(
    client
      .pipeline("twig-lint")
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
      .pipeline("yaml-lint")
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
      .pipeline("xliff-lint")
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
      .pipeline("container-lint")
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
      .pipeline("doctrine-lint")
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
      .pipeline("phpunit")
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
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && \
      vendor/bin/simple-phpunit install && \
      vendor/bin/simple-phpunit --version && \
      vendor/bin/simple-phpunit",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

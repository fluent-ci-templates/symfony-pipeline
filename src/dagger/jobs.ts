import Client from "@dagger.io/dagger";

export const securityChecker = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("security-checker")
    .container()
    .from("jakzal/phpqa:php8.1")
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git"],
    })
    .withWorkdir("/app")
    .withExec(["local-php-security-checker", "--path=./composer.lock"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const phpcs = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("phpcs")
    .container()
    .from("jakzal/phpqa:php8.1")
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git"],
    })
    .withExec([
      "phpcs",
      "-v",
      "--standard=PSR12",
      "--ignore=./src/Kernel.php",
      "./src",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const phpstan = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("phpstan")
    .container()
    .from("jakzal/phpqa:php8.1")
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git"],
    })
    .withWorkdir("/app")
    .withExec(["phpstan", "analyse", "./src"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const twigLint = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("twig-lint")
    .container()
    .from("jakzal/phpqa:php8.1")
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git"],
    })
    .withWorkdir("/app")
    .withExec(["twig-lint", "lint", "./templates"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const phpUnit = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("phpunit")
    .container()
    .from("jakzal/phpqa:php8.1")
    .withDirectory("/app", context, {
      exclude: ["vendor", "node_modules", ".git"],
    })
    .withWorkdir("/app")
    .withExec(["php", "bin/phpunit"]);

  const result = await ctr.stdout();

  console.log(result);
};
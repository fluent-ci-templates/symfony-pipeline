use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_devbox;

pub mod helpers;

#[plugin_fn]
pub fn phpcs(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec![
            "devbox run -- phpcs -v --standard=PSR12 --ignore=./src/Kernel.php ./src",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn phpstan(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            "devbox run -- composer install --no-interaction --no-progress",
        ])?
        .with_exec(vec!["devbox run -- ./vendor/bin/simple-phpunit install"])?
        .with_exec(vec!["devbox run -- ./vendor/bin/simple-phpunit --version"])?
        .with_exec(vec![
            "devbox run -- ./vendor/bin/phpstan analyse ./src --memory-limit=1G",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn twig_lint(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec![
            "devbox run -- ./bin/console lint:twig templates --env=prod",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn yaml_lint(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec![
            "devbox run -- ./bin/console lint:yaml config --parse-tags",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn xliff_lint(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec![
            "devbox run -- ./bin/console lint:xliff translations",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn container_lint(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec![
            "devbox run -- ./bin/console lint:container --no-debug",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn doctrine_lint(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec![
            "devbox run -- ./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn phpunit(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- composer install --no-interaction"])?
        .with_exec(vec!["devbox run -- vendor/bin/simple-phpunit", &args])?
        .stdout()?;
    Ok(stdout)
}

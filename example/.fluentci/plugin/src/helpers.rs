use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_devbox() -> Result<(), Error> {
    dag()
        .devbox()?
        .with_exec(vec!["[ -f devbox.json ] || devbox init"])?
        .with_exec(vec![
            "grep -q 'ruby' devbox.json || devbox add mariadb@latest,php@8.1,nodejs@18,redis@latest,php81Packages.composer@latest,php81Packages.phpcs@latest,symfony-cli@latest,yarn@latest"])?
        .stdout()?;
    Ok(())
}

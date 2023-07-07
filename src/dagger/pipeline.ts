import Client, { connect } from "@dagger.io/dagger";

export default function pipeline(_src = ".") {
  connect(async (client: Client) => {
    const ctr = client
      .pipeline("test")
      .container()
      .from("alpine")
      .withExec(["apk", "add", "curl"])
      .withExec(["curl", "https://dagger.io"]);

    const result = await ctr.stdout();

    console.log(result.substring(0, 300));
  });
}

export default async function HandeSubmit(user: URLSearchParams) {
  try {
    await fetch("https://osu.blobsu.xyz/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: user.toString(),
    });
    return <p style={{ color: "green" }}>Registration successful</p>;
  } catch (error) {
    console.error(error);
    alert("API error: Registration failed. Please try again.");
  }
}

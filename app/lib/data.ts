export async function fetchNumberofUsers() {
  try {
    const response = await fetch(`${process.env.V1_API}/get_player_count`, {
      method: "GET",
    }).then((res) => {
      return res;
    });
    const data = await response.json();
    return data.counts.online;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user count");
  }
}

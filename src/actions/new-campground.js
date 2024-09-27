"use server";

export async function newCampground(prevState, formData) {
  const title = formData.get("title");
  console.log(title);

  return null;
}

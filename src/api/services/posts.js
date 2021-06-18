import { supabase } from "../supabaseClient"

const TABLE_NAME = "posts"

export const getPostIdBySlug = async (slug = "") => {
  if (!slug) throw new Error("No slug defined")

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`id`)
    .eq("slug", slug)
    .limit(1)

  const isErrorHappened = error !== null

  if (isErrorHappened) {
    throw new Error(error.message)
  }

  const isDataExist = data.length > 0

  if (isDataExist) {
    return data[0].id
  }

  return null
}

export const insertNewPost = async (slug = "") => {
  if (!slug) throw new Error("No slug defined")

  const { data, error } = await supabase.from(TABLE_NAME).insert([{ slug }])

	const isErrorHappened = error !== null

  if (isErrorHappened) {
    throw new Error(error.message)
  }

	return data;
}

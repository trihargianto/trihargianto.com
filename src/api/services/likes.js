import { supabase } from '../supabaseClient';

const TABLE_NAME = 'likes';

export const insertPostLikes = async (postId = '', ipAddress = null) => {
	if (!postId) throw new Error("No postId parameter defined")

		const { data, error } = await supabase.from(TABLE_NAME).insert([{ postId, likes: 1, ipAddress }])

		const isErrorHappened = error !== null

		if (isErrorHappened) {
			throw new Error(error.message)
		}

		return data;
}
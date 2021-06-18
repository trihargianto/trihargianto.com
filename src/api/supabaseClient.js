import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.GATSBY_SUPABASE_URL || "https://dbxpylpptwaipcosrkdr.supabase.co"
const supabaseAnonKey =
  process.env.GATSBY_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDAzNTM0OSwiZXhwIjoxOTM5NjExMzQ5fQ.6HTNLEK4gHawmwQsJKkf3DOF4kEUrHn2MpCrPQqvdqw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

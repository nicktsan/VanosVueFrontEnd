import { createClient } from '@supabase/supabase-js'
import { ENV } from '@/../env.local'

const supabaseUrl = ENV.SUPABASE.URL || ''
const supabaseAnonKey = ENV.SUPABASE.ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

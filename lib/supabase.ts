import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          read_time: string
          published: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      projects: {
        Row: {
          id: number
          title: string
          description: string
          image: string
          tags: string[]
          link: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      testimonials: {
        Row: {
          id: number
          name: string
          role: string
          company: string
          content: string
          image: string
          rating: number
          approved: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      contacts: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
      }
      newsletter: {
        Row: {
          id: number
          email: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['newsletter']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['newsletter']['Insert']>
      }
    }
  }
}

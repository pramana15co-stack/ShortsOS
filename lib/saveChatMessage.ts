import { supabase } from '@/lib/supabaseClient'

export interface ChatMessage {
  name: string
  email: string
  message: string
  user_id?: string
}

export async function saveChatMessage(
  message: ChatMessage
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const { error } = await supabase.from('chat_messages').insert({
      name: message.name,
      email: message.email,
      message: message.message,
      user_id: message.user_id || null,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    }
  }
}


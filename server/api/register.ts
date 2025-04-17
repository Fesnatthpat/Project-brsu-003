import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const { id, email, role } = body

    if (!id || !email || !role) {
        return {
            error: 'Missing required fields',
        }
    }

    const client = await serverSupabaseClient<Database>(event)

    console.log("Data being inserted:", { id, email, role })

    const { error } = await client.from('Profile').insert([
        { id, email, role }
    ])

    if (error) {
        console.error("Supabase Insert Error:", error)
        return {
            error: error.message,
        }
    }

    // console.log("Insert Success, Data:", data)

    return {
        message: 'User role inserted successfully',
    }

})

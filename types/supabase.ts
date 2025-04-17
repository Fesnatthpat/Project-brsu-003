export type Database = {
    public: {
        Tables: {
            Profile: {
                Row: {
                    id: string
                    email: string
                    role: string
                }
                Insert: {
                    id: string
                    email: string
                    role: string
                }
                Update: {
                    email?: string
                    role?: string
                }
            }
        }
    }
}
